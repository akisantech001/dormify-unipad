
const Legal = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Legal Information</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Terms of Service</h2>
            <p className="text-gray-600 mb-4">
              By using Dormify, you agree to comply with and be bound by the following terms and conditions of use.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Users must provide accurate and truthful information</li>
              <li>All bookings are subject to property owner approval</li>
              <li>Users are responsible for their own safety and due diligence</li>
              <li>Dormify acts as a platform connecting students and property owners</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy Policy</h2>
            <p className="text-gray-600 mb-4">
              We are committed to protecting your privacy and personal information.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>We collect information necessary to provide our services</li>
              <li>Personal data is encrypted and stored securely</li>
              <li>We do not sell or share personal information with third parties</li>
              <li>Users can request data deletion at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimer</h2>
            <p className="text-gray-600 mb-4">
              Dormify provides a platform for connecting students with accommodation providers. 
              We make reasonable efforts to verify listings, but users should conduct their own 
              due diligence before making any commitments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact for Legal Matters</h2>
            <p className="text-gray-600">
              For legal inquiries, please contact us at legal@dormify.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Legal;
