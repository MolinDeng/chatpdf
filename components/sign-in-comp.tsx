import React from 'react';
import Image from 'next/image';

import {
  FaBusinessTime,
  FaChartLine,
  FaCloud,
  FaGoogle,
  FaMicrosoft,
  FaPinterest,
  FaSkype,
  FaTiktok,
  FaYahoo,
} from 'react-icons/fa6';
const features = [
  {
    Icon: FaChartLine,
    title: 'Performance at scale',
    description:
      'Power search across billions of embeddings with ultra-low query latency',
  },
  {
    Icon: FaBusinessTime,
    title: 'Start free, scale effortlessly',
    description: 'Get started for free, then upgrade and scale as needed',
  },
  {
    Icon: FaCloud,
    title: 'Fully managed',
    description:
      'No need to maintain infrastructure, monitor services, or troubleshoot algorithms',
  },
];
const companies = [
  FaGoogle,
  FaMicrosoft,
  FaPinterest,
  FaSkype,
  FaTiktok,
  FaYahoo,
];
export default function SignInComp({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <div className="bg-primary lg:flex lg:flex-col lg:items-center lg:justify-center">
        <div className="lg:max-w-4xl my-10">
          <div className="flex mx-10">
            <div className="relative w-8 h-8 mr-4">
              <Image fill alt="logo" src="/icon.png" />
            </div>
            <p className="text-2xl font-medium text-primary-foreground">
              ChatPDF
            </p>
          </div>
          <p className="mx-10 my-6">
            <span className="sm:text-3xl text-2xl font-semibold text-primary-foreground">
              Long-term memory for AI.
            </span>
            <br />
            <span className="sm:text-3xl font-semibold text-2xl text-eye opacity-80">
              Start building for free.
            </span>
          </p>
          <div className="lg:hidden my-10 mx-auto max-w-fit ">{children}</div>
          <div className="flex flex-col items-center">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-card-foreground rounded-2xl my-4 mx-8 flex items-center justify-start p-4 max-w-lg"
              >
                <feature.Icon className="sm:w-8 sm:h-8 w-6 h-6 mx-4 mr-8 text-eye opacity-80 flex-shrink-0" />
                <div className="max-w-md">
                  <p className="sm:text-2xl text-lg text-muted-foreground">
                    {feature.title}
                  </p>
                  <p className="sm:text-lg text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-primary-foreground grid grid-cols-3 grid-rows-2 gap-8 justify-items-center mt-10 max-w-xl mx-auto">
            {companies.map((Company, i) => (
              <Company key={i} className="w-10 h-10 m-4 flex-shrink-0" />
            ))}
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
