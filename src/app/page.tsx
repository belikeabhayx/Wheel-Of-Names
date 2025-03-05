"use client"
import React, { useState, useEffect } from "react";
import SpinWheel from "@/components/SpinWheel";
import EntryManager from "@/components/EntryManager";
import ResultsList from "@/components/ResultsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

const Home = () => {
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevents hydration errors
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 p-4">
      <div className="mx-auto max-w-7xl">
        <header className="text-center py-8">
          <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-400 inline-block mb-3 drop-shadow-sm">
            Spin Wheel Picker
          </h1>
          <p className="text-gray-300 max-w-md mx-auto">
            Add names to the wheel, spin it, and let fate decide the winner.
          </p>
        </header>

        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </div>
    </div>
  );
};

const DesktopLayout = () => {
  return (
    <div className="grid grid-cols-[1fr_350px] gap-8 mt-4">
      <div className="flex items-center justify-center py-8">
        <SpinWheel />
      </div>

      <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700 h-[calc(100vh-220px)]">
        <Tabs defaultValue="entries" className="h-full flex flex-col">
          <TabsList className="w-full grid grid-cols-2 rounded-none border-b border-gray-700 bg-gray-800/90">
            <TabsTrigger
              value="entries"
              className="data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Entries
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Results
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="entries"
            className="flex-1 overflow-y-auto m-0 h-full"
          >
            <EntryManager />
          </TabsContent>
          <TabsContent
            value="results"
            className="flex-1 overflow-y-auto m-0 h-full"
          >
            <ResultsList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const MobileLayout = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-center py-4">
        <SpinWheel />
      </div>

      <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700 h-[400px]">
        <Tabs defaultValue="entries" className="h-full flex flex-col">
          <TabsList className="w-full grid grid-cols-2 rounded-none border-b border-gray-700 bg-gray-800/90">
            <TabsTrigger
              value="entries"
              className="data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Entries
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Results
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="entries"
            className="flex-1 overflow-y-auto m-0 h-full"
          >
            <EntryManager />
          </TabsContent>
          <TabsContent
            value="results"
            className="flex-1 overflow-y-auto m-0 h-full"
          >
            <ResultsList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
