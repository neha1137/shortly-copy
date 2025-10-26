"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [urls, setUrls] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;

    fetch("/api/dashboard-data")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        return res.json();
      })
      .then((data) => {
        console.log("✅ Dashboard data:", data);
        setUrls(data.urls || []);
        setAnalytics(data.analytics || {});
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error loading dashboard:", err);
        setLoading(false);
      });
  }, [isLoaded, user]);

  if (!isLoaded || loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading dashboard...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-700 text-lg">
        Please log in to view your dashboard.
      </div>
    );
  }

  const username = user.firstName || user.username || "User";
  const COLORS = ["#06d6a0", "#118ab2", "#ef476f", "#ffd166", "#073b4c"];

  // Helper: Convert analytics objects into chart data
  const toChartData = (obj) =>
    Object.entries(obj || {}).map(([key, value]) => ({ name: key, value }));

  const deviceData = toChartData(analytics?.deviceStats);
  const locationData = toChartData(analytics?.locationStats);
  const browserData = toChartData(analytics?.browserStats);
  const osData = toChartData(analytics?.osStats);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* 👋 Header */}
      <section className="h-screen flex items-center justify-center">
        <h1 className="text-6xl md:text-8xl font-thin text-center">
          👋 Hello, {username}
        </h1>
      </section>

      {/* User Links */}
      <section className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-semibold mb-6">Your Shortened Links</h2>
        {urls.length === 0 ? (
          <p className="text-gray-500">No links found yet.</p>
        ) : (
          <ul className="space-y-4">
            {urls.map((url) => (
              <li
                key={url.id}
                className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between"
              >
                <div>
                  <p className="font-medium">{url.shorturl}</p>
                  <a
                    href={url.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    {url.url}
                  </a>
                </div>
                <p className="text-gray-400 text-sm mt-2 sm:mt-0">
                  {url.visits?.length || 0} visits
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Analytics Section */}
      {analytics && (
        <section className="max-w-6xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Device Type */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Visits by Device</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {deviceData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Locations */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Visits by Location</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#118ab2" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Browser */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Visits by Browser</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={browserData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {browserData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* OS */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Visits by Operating System</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={osData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#ef476f" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}
    </div>
  );
}
