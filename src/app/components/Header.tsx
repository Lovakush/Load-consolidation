import { motion } from 'motion/react';
import { Bell, Settings, User, Layers } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';

export function Header() {
  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/95 border-b border-slate-200/80 px-8 py-6 sticky top-0 z-50 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg shadow-sm">
            <Layers className="w-6 h-6 text-black" strokeWidth={2.5} />
          </div>
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-2xl font-semibold text-slate-900 tracking-tight"
            >
              Load Consolidation Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="text-sm text-slate-500 font-medium"
            >
              Real-time logistics monitoring
            </motion.p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          >
            <Badge
              variant="outline"
              className="px-3 py-1.5 bg-emerald-50/80 border border-emerald-200 text-emerald-700 font-medium text-xs shadow-sm"
            >
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse" />
              System Operational
            </Badge>
          </motion.div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-slate-50 transition-colors duration-200 rounded-lg"
              >
                <Bell className="w-4 h-4 text-slate-600" strokeWidth={2.5} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-yellow-400 rounded-full ring-2 ring-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 shadow-xl border-slate-200">
              <DropdownMenuItem className="p-3">
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm text-slate-900">New consolidation opportunity</p>
                  <p className="text-xs text-slate-500">5 minutes ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm text-slate-900">Route optimization complete</p>
                  <p className="text-xs text-slate-500">15 minutes ago</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-slate-50 transition-colors duration-200 rounded-lg"
          >
            <Settings className="w-4 h-4 text-slate-600" strokeWidth={2.5} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-slate-50 transition-colors duration-200 rounded-lg"
          >
            <User className="w-4 h-4 text-slate-600" strokeWidth={2.5} />
          </Button>
        </div>
      </div>
    </motion.header>
  );
}