import { motion } from 'motion/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function TimeFilter() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center gap-2"
    >
      <Select defaultValue="30days">
        <SelectTrigger className="w-44 bg-white border-slate-200 hover:border-slate-300 transition-colors duration-200 shadow-sm text-sm font-medium">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="shadow-xl border-slate-200">
          <SelectItem value="24hours">Last 24 Hours</SelectItem>
          <SelectItem value="7days">Last 7 Days</SelectItem>
          <SelectItem value="30days">Last 30 Days</SelectItem>
          <SelectItem value="90days">Last 90 Days</SelectItem>
          <SelectItem value="custom">Custom Range</SelectItem>
        </SelectContent>
      </Select>
    </motion.div>
  );
}