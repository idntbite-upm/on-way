import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <UserProfile
        appearance={{
          elements: {
            rootBox: "mx-auto max-w-[800px]",
            card: "shadow-none",
          },
        }}
      />
    </div>
  );
}
