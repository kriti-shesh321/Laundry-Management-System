import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL!;

const pool = new Pool({
    connectionString
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter
});

async function main() {
    console.log("Starting seed...");

    // hashing password
    const hashedPassword = await bcrypt.hash("qwertyuiop", 10);

    // seeding data
    const users = [
        {
            name: "Rei Sora",
            phone: "+56789876532",
            email: "rei@gmail.com",
            password: hashedPassword,
            role: Role.ADMIN,
        },
        {
            name: "Kei Izumi",
            phone: "+918456789876",
            email: "kei@example.com",
            password: hashedPassword,
            role: Role.CUSTOMER,
        },
        {
            name: "Hitesh Sharma",
            phone: "+919876543210",
            email: "hitesh@example.com",
            password: hashedPassword,
            role: Role.CUSTOMER,
        },
    ];

    for (const user of users) {
        await prisma.user.upsert({
            where: {
                email: user.email,
            },
            update: {},
            create: user,
        });
    }

    console.log("Users seeded");

    // seeding garment types
    const garmentTypes = [
        {
            name: "Shirt",
            basePrice: 50,
        },
        {
            name: "Pants",
            basePrice: 80,
        },
        {
            name: "Saree",
            basePrice: 120,
        },
        {
            name: "Blazer",
            basePrice: 150,
        },
        {
            name: "Whites",
            basePrice: 60,
        },
    ];

    for (const garment of garmentTypes) {
        await prisma.garmentType.upsert({
            where: {
                name: garment.name,
            },
            update: {},
            create: garment,
        });
    }

    console.log("Garment types seeded");
    console.log("✅ Seeding completed");
}

main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });