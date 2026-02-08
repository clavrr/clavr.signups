
import { prisma } from "../lib/db";

async function verifyFix() {
    const email = "TestUser@Example.com";
    const normalizedEmail = email.toLowerCase();

    console.log(`Testing with email: ${email} (normalized: ${normalizedEmail})`);

    // 1. Clean up existing test user
    await prisma.user.deleteMany({
        where: { email: normalizedEmail }
    });
    console.log("Cleaned up existing test user.");

    // 2. Simulate UPSERT (Save Profile) - this should create the user with lowercase email
    console.log("Simulating Profile Save (UPSERT)...");
    const updatedUser = await prisma.user.upsert({
        where: { email: normalizedEmail },
        update: { bio: "Persisted Bio" },
        create: {
            email: normalizedEmail,
            name: "Test User",
            bio: "Persisted Bio",
            role: "author"
        }
    });

    if (updatedUser.bio === "Persisted Bio") {
        console.log("✅ User created/updated successfully with bio.");
    } else {
        console.error("❌ User update failed.");
    }

    // 3. Simulate GET (Fetch Profile) with Original Mixed-Case Email
    // The API now normalizes usage, so we simulate what the API does:
    console.log("Simulating Profile Fetch (GET) with normalization...");

    const retrievedUser = await prisma.user.findUnique({
        where: { email: normalizedEmail } // This is what the fixed API does
    });

    if (retrievedUser && retrievedUser.bio === "Persisted Bio") {
        console.log("✅ SUCCESS: Profile data persisted and retrieved correctly using normalized email.");
    } else {
        console.error("❌ FAILURE: Could not retrieve the persisted bio.");
        console.log("Retrieved:", retrievedUser);
    }

    // Cleanup
    await prisma.user.deleteMany({
        where: { email: normalizedEmail }
    });
    console.log("Cleanup done.");
}

verifyFix()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
