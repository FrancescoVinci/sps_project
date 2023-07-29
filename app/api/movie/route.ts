import { NextResponse } from "next/server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const titleName = searchParams.get("title");

    if (!titleName) {
        return NextResponse.json({
            response_code: 400,
            error: true,
            message: "Bad request",
            data: []
        });
    }

    const title = await prisma.title_basics.findFirst({
        where: {
            primarytitle: { contains: titleName },
            title_type: "movie",

        },
        select: {
            primarytitle: true,
            start_year: true,
            runtime_minutes: true,
            genres: true,
            title_crew: {
                select: {
                    directors: true,
                    writers: true,
                }
            },
            title_principals: {
                where: {
                    OR: [
                        { category: "actor" },
                        { category: "actress" },
                    ]
                },
                select: {
                    name_basics: {
                        select: {
                            primary_name: true,
                        }
                    }
                },
            },
            title_ratings: {
                select: {
                    average_rating: true,
                    num_votes: true,
                }
            }
        },
    });

    if (!title) {
        return NextResponse.json({
            response_code: 404,
            error: true,
            message: "Title not found",
            data: []
        });
    }

    if (title.title_crew?.directors) {
        const directorsSet = title.title_crew.directors.split(",");

        const directorsData = await prisma.name_basics.findMany({
            where: {
                nconst: { in: directorsSet }
            },
            select: {
                primary_name: true,
            }
        });

        title.title_crew.directors = directorsData as any;
    }

    if (title.title_crew?.writers) {
        const writersSet = title.title_crew.writers.split(",");

        const writersData = await prisma.name_basics.findMany({
            where: {
                nconst: { in: writersSet }
            },
            select: {
                primary_name: true,
            }
        })

        title.title_crew.writers = writersData as any;
    }

    return NextResponse.json({
        response_code: 200,
        error: false,
        message: "Title found",
        data: title
    });
}
