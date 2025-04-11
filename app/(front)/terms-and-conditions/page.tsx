import { CheckCircle, ShieldCheck, Users } from "lucide-react";

export default function page() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Terms and Conditions</h1>
      <p className="text-gray-700">
        Welcome to Shiftly.uk. By using our platform, you agree to comply with our
        terms and conditions. Please read them carefully.
      </p>

      <section>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <ShieldCheck className="text-blue-500" /> User Eligibility
        </h2>
        <p className="text-gray-700">
          Users must be verified healthcare professionals or registered
          healthcare providers to access our services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Users className="text-green-500" /> Account Responsibilities
        </h2>
        <p className="text-gray-700">
          Users are responsible for maintaining the security of their account
          and ensuring that all provided information is accurate and up to date.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <CheckCircle className="text-purple-500" /> Booking and Payments
        </h2>
        <p className="text-gray-700">
          Shiftly facilitates connections between professionals and providers.
          Payment terms and shift agreements are subject to mutual consent
          between parties.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <ShieldCheck className="text-red-500" /> Compliance and Conduct
        </h2>
        <p className="text-gray-700">
          Users must adhere to all UK healthcare regulations and professional
          standards. Misconduct may result in account suspension or termination.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Users className="text-yellow-500" /> Liability and Disputes
        </h2>
        <p className="text-gray-700">
          Shiftly is not liable for disputes arising between users. Any legal
          matters must be resolved independently.
        </p>
      </section>

      <footer className="text-center text-gray-600 mt-6 border-t pt-4">
        <p>
          These terms may be updated periodically. Continued use of the platform
          indicates acceptance of the latest terms.
        </p>
      </footer>
    </div>
  );
}
