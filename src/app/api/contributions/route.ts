import { NextResponse } from "next/server";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const USERNAME = "HS1CMU";

const LEVEL_MAP: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN not set in .env.local" },
      { status: 500 },
    );
  }

  const now = new Date();
  const from = new Date(now);
  from.setFullYear(from.getFullYear() - 1);

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
          restrictedContributionsCount
        }
      }
    }
  `;

  try {
    const res = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          username: USERNAME,
          from: from.toISOString(),
          to: now.toISOString(),
        },
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[contributions] GitHub API error:", res.status, text);
      return NextResponse.json(
        { error: `GitHub API ${res.status}`, detail: text },
        { status: 502 },
      );
    }

    const json = await res.json();

    if (json.errors) {
      console.error("[contributions] GraphQL errors:", json.errors);
      return NextResponse.json(
        { error: "GraphQL error", detail: json.errors },
        { status: 502 },
      );
    }

    const collection = json.data?.user?.contributionsCollection;
    const calendar = collection?.contributionCalendar;

    if (!calendar) {
      console.error("[contributions] No calendar in response:", JSON.stringify(json).slice(0, 500));
      return NextResponse.json(
        { error: "No calendar data", detail: json },
        { status: 502 },
      );
    }

    const contributions: { date: string; count: number; level: number }[] = [];
    for (const week of calendar.weeks) {
      for (const day of week.contributionDays) {
        contributions.push({
          date: day.date,
          count: day.contributionCount,
          level: LEVEL_MAP[day.contributionLevel] ?? 0,
        });
      }
    }

    const restricted = collection.restrictedContributionsCount ?? 0;
    const total = calendar.totalContributions + restricted;
    console.log(`[contributions] OK — ${total} contributions (${restricted} restricted), ${contributions.length} days`);

    return NextResponse.json({ total, contributions });
  } catch (e) {
    console.error("[contributions] Fetch error:", e);
    return NextResponse.json(
      { error: String(e) },
      { status: 500 },
    );
  }
}
