"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { format, addYears } from "date-fns"
import { ArrowRight, BarChart3, Calendar as CalendarIcon, Hourglass, Puzzle, RefreshCcw, Settings2 } from "lucide-react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export default function DashboardPage() {
  // Default: Jan 01 of Current Year to Today
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [isRefreshing,setRefreshing] = useState(false)
  
  const [fromDate, setFromDate] = useState<Date>(() => {
    const fromParam = searchParams.get("from")
    if (fromParam) {
      const parsed = new Date(fromParam)
      if (!isNaN(parsed.getTime())) return parsed
    }
    const date = new Date()
    date.setMonth(0) // January
    date.setDate(1)  // 1st
    return date
  })

  const [toDate, setToDate] = useState<Date>(() => {
    const toParam = searchParams.get("to")
    if (toParam) {
      const parsed = new Date(toParam)
      if (!isNaN(parsed.getTime())) return parsed
    }
    return new Date()
  })

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (fromDate) {
      params.set("from", format(fromDate, "yyyy-MM-dd"))
    } else {
      params.delete("from")
    }

    if (toDate) {
      params.set("to", format(toDate, "yyyy-MM-dd"))
    } else {
      params.delete("to")
    }

    const newSearch = params.toString()
    if (newSearch !== searchParams.toString()) {
        router.replace(`${pathname}?${newSearch}`, { scroll: false })
    }
  }, [fromDate, toDate, pathname, router, searchParams])

  // Auto-Fetch with useQuery
  const { data: countData, isLoading, refetch } = useQuery({
    queryKey: ["emailCount", fromDate, toDate],
    staleTime:0,
    queryFn: async () => {
      const res = await fetch("/api/gmail/count", {
        method: "POST",
        body: JSON.stringify({
          query: 'from:(Form+Approvals) subject:Complete',
          from: fromDate ? format(fromDate, "yyyy/MM/dd") : undefined,
          to: toDate ? format(addYears(toDate, 1), "yyyy/MM/dd") : undefined,
        }),
      })

      if (!res.ok) throw new Error("Failed to count emails")
      
      return res.json()
    },
  })

  // Calculation Logic
  const QUOTA_LIMIT = 18
  // Use totalDays if available, otherwise fallback to 0. 
  // If countData itself is loading/undefined, this will adjust automatically.
  const totalActiveListings =countData?.totalDays ?? 0
  const remainingActiveListings = QUOTA_LIMIT - totalActiveListings


  // console.log("countData ac",countData)
  // console.log("totalActiveListings",totalActiveListings)
  // console.log("remainingActiveListings",remainingActiveListings)  



  return (
    <div className="space-y-8 p-1 md:p-2 max-w-7xl mx-auto">
      
      {/* 1. Dashboard Controls */}
      <section className="space-y-4">
        <Card className="p-6 bg-white border-gray-100 shadow-sm rounded-xl">
            <div className="flex items-center gap-2 mb-6">
                <Settings2 className="w-5 h-5 text-[#1a73e8]" />
                <h2 className="text-base font-bold text-gray-900">Dashboard Controls</h2>
            </div>

            <div className="flex flex-col md:flex-row items-end gap-6">
                
                <div className="w-full md:w-1/3 space-y-2">
                    <label className="text-sm font-semibold text-gray-600">From Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal h-11 border-gray-200 hover:bg-gray-50",
                                !fromDate && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-3 h-4 w-4 text-gray-400" />
                            {fromDate ? format(fromDate, "MM/dd/yyyy") : <span>mm/dd/yyyy</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={fromDate}
                            onSelect={(date) => date && setFromDate(date)}
                            defaultMonth={fromDate}
                            initialFocus
                            disabled={(date) => date > new Date() || date < new Date("2022-01-01")}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="w-full md:w-1/3 space-y-2">
                    <label className="text-sm font-semibold text-gray-600">To Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal h-11 border-gray-200 hover:bg-gray-50",
                                !toDate && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-3 h-4 w-4 text-gray-400" />
                            {toDate ? format(toDate, "MM/dd/yyyy") : <span>mm/dd/yyyy</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={toDate}
                            onSelect={(date) => date && setToDate(date)}
                            defaultMonth={toDate}
                            initialFocus
                            disabled={(date) => date < new Date(new Date().getFullYear(), 0, 1)}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            <div className="md:w-auto flex gap-2">
                 <Button
                    variant="outline"
                    className="h-11 border-gray-200 hover:bg-gray-50 px-4 hover:cursor-pointer"
                    onClick={() => {
                        const date = new Date()
                        date.setMonth(0)
                        date.setDate(1)
                        setFromDate(date)
                        setToDate(new Date())
                    }}
                    title="Reset Filters"
                >
                    Reset Filters
                </Button>
                 <Button
                    variant="outline"
                    size="icon"
                    className="h-11 w-11 border-gray-200 hover:bg-gray-50  hover:cursor-pointer"
                    onClick={async () => {
                      setRefreshing(true)
                     await refetch()
                     setRefreshing(false)
                    }}
                    disabled={isLoading}
                    title="Refresh Data"
                >
                    <RefreshCcw className={cn("h-4 w-4 text-gray-400", isLoading  || isRefreshing && "animate-spin")} />
                </Button>
            </div>
            </div>
        </Card>
      </section>

      {/* 2. Analytics Overview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
             <h2 className="text-xl font-bold text-gray-900">Analytics Overview</h2>
        </div>
       
        <div className="grid md:grid-cols-2 gap-6">
            {/* Active Listings Card */}
            <Card className="p-6 bg-white border-gray-100 shadow-sm rounded-xl relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-8">
                     <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-[#1a73e8]" />
                     </div>
                     <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <ArrowRight className="w-3 h-3 -rotate-45" />
                        Live
                     </span>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Total Used Annual Leave  (AL)</h3>
                    <p className="text-4xl font-bold text-gray-900 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {isLoading  || isRefreshing? "..." : totalActiveListings > 18 ? "18" : totalActiveListings}
                    </p>
                </div>
            </Card>

             {/* Remaining Listings Card */}
             <Card className="p-6 bg-white border-gray-100 shadow-sm rounded-xl relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-8">
                     <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                        <Hourglass className="w-6 h-6 text-orange-500" />
                     </div>
                     <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                        Quota Limit: {QUOTA_LIMIT}
                     </span>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Remaining Annual Leave </h3>
                     <p className="text-4xl font-bold text-gray-900 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {isLoading || isRefreshing ? "..." : remainingActiveListings <= 0 ? "0" : remainingActiveListings }
                     </p>
                </div>
            </Card>
        </div>
      </section>

      {/* 3. Future Modules */}
      <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Future Modules</h2>
          <div className="grid md:grid-cols-2 gap-6">
                {/* Performance Widget Placeholder */}
               <div className="h-64 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 flex flex-col items-center justify-center p-6 text-center hover:bg-gray-50 transition-colors cursor-default">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                         <BarChart3 className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Performance Widget</h3>
                    <p className="text-sm text-gray-500 max-w-xs">
                        This space is reserved for future performance tracking metrics.
                    </p>
               </div>

               {/* Extension Slot Placeholder */}
               <div className="h-64 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 flex flex-col items-center justify-center p-6 text-center hover:bg-gray-50 transition-colors cursor-default">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                         <Puzzle className="w-8 h-8" />
                    </div>
                     <h3 className="text-lg font-bold text-gray-800 mb-2">Extension Slot</h3>
                    <p className="text-sm text-gray-500 max-w-xs">
                        Additional tools and integrations will appear here soon.
                    </p>
               </div>
          </div>
      </section>

    </div>
  )
}
