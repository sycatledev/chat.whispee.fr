import React from "react";

export default function MessagesSkeleton() {
  return (
    <>
      <li className="col-start-9 col-end-13 p-3 rounded-lg">
        <div className="animate-pulse flex space-x-4 items-center p-2">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
          </div>
          <div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
        </div>
      </li>
      <li className="col-start-1 col-end-8 p-3 rounded-lg">
        <div className="animate-pulse flex flex-row-reverse space-x-4 items-center p-2">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
          </div>
          <div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
        </div>
      </li>
      <li className="col-start-1 col-end-8 p-3 rounded-lg">
        <div className="animate-pulse flex flex-row-reverse space-x-4 items-center p-2">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
          </div>
          <div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
        </div>
      </li>
      <li className="col-start-9 col-end-13 p-3 rounded-lg">
        <div className="animate-pulse flex space-x-4 items-center p-2">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
          </div>
          <div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
        </div>
      </li>
      <li className="col-start-1 col-end-8 p-3 rounded-lg">
        <div className="animate-pulse flex flex-row-reverse space-x-4 items-center p-2">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
          </div>
          <div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
        </div>
      </li>
      <li className="col-start-1 col-end-8 p-3 rounded-lg">
        <div className="animate-pulse flex flex-row-reverse space-x-4 items-center p-2">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
          </div>
          <div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
        </div>
      </li>
    </>
  );
}
