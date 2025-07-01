import SignupForm from "@/components/SignupForm";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl mb-6">Sign Up</h1>
      <SignupForm />
    </main>
  );
}

