"use client";

import { useState } from "react";
import { iconMap, iconNames } from "@/lib/iconMap";
import { Search, X } from "lucide-react";

interface IconPickerProps {
    value: string;
    onChange: (iconName: string) => void;
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredIcons = iconNames.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase())
    );

    const SelectedIcon = value ? iconMap[value] : null;

    return (
        <div className="relative">
            {/* Selected Icon Display */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
                <div className="flex items-center gap-3">
                    {SelectedIcon ? (
                        <>
                            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                <SelectedIcon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">{value}</span>
                        </>
                    ) : (
                        <span className="text-gray-500">Select an icon...</span>
                    )}
                </div>
                <Search className="w-4 h-4 text-gray-400" />
            </button>

            {/* Icon Picker Dropdown */}
            {isOpen && (
                <div className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-2xl">
                    {/* Search Input */}
                    <div className="p-3 border-b border-gray-200 dark:border-gray-800">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search icons..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-10 py-2 bg-gray-100 dark:bg-gray-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                                autoFocus
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Icon Grid */}
                    <div className="p-3 max-h-80 overflow-y-auto">
                        <div className="grid grid-cols-4 gap-2">
                            {filteredIcons.map((iconName) => {
                                const Icon = iconMap[iconName];
                                const isSelected = value === iconName;
                                return (
                                    <button
                                        key={iconName}
                                        type="button"
                                        onClick={() => {
                                            onChange(iconName);
                                            setIsOpen(false);
                                            setSearch("");
                                        }}
                                        className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${isSelected
                                                ? "bg-primary/20 border-2 border-primary"
                                                : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent"
                                            }`}
                                        title={iconName}
                                    >
                                        <div className={`w-8 h-8 flex items-center justify-center ${isSelected ? "text-primary" : "text-gray-600 dark:text-gray-400"}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className={`text-[10px] font-medium text-center leading-tight ${isSelected ? "text-primary" : "text-gray-600 dark:text-gray-400"}`}>
                                            {iconName}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                        {filteredIcons.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No icons found
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setIsOpen(false);
                        setSearch("");
                    }}
                />
            )}
        </div>
    );
}
