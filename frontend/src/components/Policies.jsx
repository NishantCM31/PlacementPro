import React from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const Policies = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-8 my-10 bg-white border border-gray-200 shadow-md rounded-2xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Application Policies
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-medium text-gray-700 mb-4">
            How <strong>PlaceMate</strong> Works
          </h2>
          <p className="text-gray-600 leading-relaxed">
            <strong>PlaceMate</strong> streamlines the placement process by
            allowing students to apply to multiple companies for job
            opportunities. Once you apply to a company, your application is
            recorded, and you can track the status of your application within
            your dashboard. You can view updates on your applications, interview
            requests, and potential job offers from the platform.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            After submitting an application, companies will review your profile.
            Be sure to regularly check your dashboard for updates and
            notifications regarding interview schedules and further steps in the
            hiring process.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-medium text-gray-700 mb-4">
            Reapplication Policy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Some companies have a reapplication policy. For example, once you
            apply to a company through <strong>PlaceMate</strong>, you may be
            restricted from reapplying to that company for a specific period,
            such as <strong>6 months</strong>. This allows companies to process
            applications fairly and ensures that you don't spam applications to
            the same company within a short time frame.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Make sure to check the reapplication policies of individual
            companies on the job posting page before submitting multiple
            applications. Violating the reapplication policy may lead to your
            applications being automatically rejected.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-medium text-gray-700 mb-4">
            Terms & Conditions
          </h2>
          <p className="text-gray-600 leading-relaxed">
            By using <strong>PlaceMate</strong>, you agree to comply with the
            policies and guidelines set forth by both the companies and{" "}
            <strong>PlaceMate</strong>. Each company may have specific
            requirements and policies related to their application processes. Be
            sure to review these policies before applying to ensure you meet the
            necessary criteria and to avoid any potential application issues.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Policies;
