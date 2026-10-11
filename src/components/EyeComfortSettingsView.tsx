import React from 'react';
import {
  X,
  Sun,
  Moon,
  BookOpen,
  RotateCcw,
  Check,
  Eye,
  Sparkles,
} from 'lucide-react';
import { EyeComfortSettings, EyeComfortMode } from '../types';
import { AppleCapsuleSlider } from './AppleCapsuleSlider';

interface EyeComfortSettingsViewProps {
  settings: EyeComfortSettings;
  onUpdateSettings: (newSettings: EyeComfortSettings) => void;
  onClose: () => void;
  fileName?: string;
}

export const EyeComfortSettingsView: React.FC<EyeComfortSettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onClose,
  fileName,
}) => {
  const handleReset = () => {
    onUpdateSettings({
      brightness: 100,
      colorMode: 'normal',
      warmth: 50,
    });
  };

  const handleBrightnessChange = (val: number) => {
    onUpdateSettings({
      ...settings,
      brightness: Math.max(40, Math.min(120, val)),
    });
  };

  const handleColorModeChange = (mode: EyeComfortMode) => {
    onUpdateSettings({
      ...settings,
      colorMode: mode,
    });
  };

  const handleWarmthChange = (val: number) => {
    onUpdateSettings({
      ...settings,
      warmth: Math.max(20, Math.min(80, val)),
    });
  };

  // Preview styling calculations
  const previewFilter =
    settings.brightness !== 100 ? `brightness(${settings.brightness}%)` : undefined;

  let previewBg = 'bg-white text-neutral-900 border-neutral-200';
  let previewHighlight = 'bg-amber-100 text-amber-900';
  let previewMuted = 'text-neutral-500';

  if (settings.colorMode === 'yellow') {
    previewBg = 'bg-[#fbf4de] text-amber-950 border-amber-300/80';
    previewHighlight = 'bg-amber-300/60 text-amber-950';
    previewMuted = 'text-amber-800/80';
  } else if (settings.colorMode === 'dark-gray') {
    previewBg = 'bg-[#222225] text-neutral-100 border-neutral-700';
    previewHighlight = 'bg-neutral-800 text-amber-300 border border-amber-500/30';
    previewMuted = 'text-neutral-400';
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none animate-in fade-in duration-200 font-sans"
      dir="rtl"
    >
      {/* Apple Minimal Settings Card Container */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-2xl w-full max-w-xl overflow-hidden flex flex-col my-auto animate-ios-jelly">
        {/* Header (مینیمال و متقارن اپل) */}
        <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center border border-amber-300/30">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-neutral-900">
                تنظیمات نمایشگر و راحتی چشم
              </h2>
              {fileName && (
                <p className="text-[11px] text-neutral-400 truncate max-w-[200px] sm:max-w-xs">
                  {fileName}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(settings.brightness !== 100 || settings.colorMode !== 'normal') && (
              <button
                onClick={handleReset}
                className="px-2.5 py-1 text-xs text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg cursor-pointer flex items-center gap-1 transition-colors"
                title="بازنشانی"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">پیش‌فرض</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 flex items-center justify-center cursor-pointer transition-colors"
              title="بستن"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body Content - دم دست، متقارن و یکپارچه */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* 1. Theme / Appearance Cards (متقارن ۳ کارت تم اپل) */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-neutral-600">تم و رنگ کاغذ</span>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Option A: Normal White */}
              <button
                type="button"
                onClick={() => handleColorModeChange('normal')}
                className={`p-3 rounded-2xl border-2 text-center cursor-pointer flex flex-col items-center justify-between h-28 transition-all ios-spring-card ${
                  settings.colorMode === 'normal'
                    ? 'border-neutral-900 bg-neutral-50/80 shadow-xs'
                    : 'border-neutral-200/80 hover:border-neutral-300 bg-white'
                }`}
              >
                {/* Visual miniature mockup */}
                <div className="w-12 h-10 rounded-lg bg-white border border-neutral-200 shadow-2xs flex flex-col justify-center items-center gap-1 p-1">
                  <div className="w-8 h-1 bg-neutral-300 rounded-full" />
                  <div className="w-6 h-1 bg-neutral-200 rounded-full" />
                </div>
                <div className="w-full">
                  <span className="text-xs font-bold text-neutral-800 block">سفید</span>
                  <span className="text-[10px] text-neutral-400 block">طبیعی</span>
                </div>
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    settings.colorMode === 'normal'
                      ? 'bg-neutral-900 text-white'
                      : 'border border-neutral-300'
                  }`}
                >
                  {settings.colorMode === 'normal' && <Check className="w-2.5 h-2.5" />}
                </div>
              </button>

              {/* Option B: Warm Yellow (Book Paper) */}
              <button
                type="button"
                onClick={() => handleColorModeChange('yellow')}
                className={`p-3 rounded-2xl border-2 text-center cursor-pointer flex flex-col items-center justify-between h-28 transition-all ios-spring-card ${
                  settings.colorMode === 'yellow'
                    ? 'border-amber-500 bg-amber-50/80 shadow-xs'
                    : 'border-neutral-200/80 hover:border-neutral-300 bg-white'
                }`}
              >
                {/* Visual miniature mockup */}
                <div className="w-12 h-10 rounded-lg bg-[#fbf4de] border border-amber-300 shadow-2xs flex flex-col justify-center items-center gap-1 p-1">
                  <div className="w-8 h-1 bg-amber-700/40 rounded-full" />
                  <div className="w-6 h-1 bg-amber-600/30 rounded-full" />
                </div>
                <div className="w-full">
                  <span className="text-xs font-bold text-amber-950 block">کاغذ زرد</span>
                  <span className="text-[10px] text-amber-700/80 block">کتاب</span>
                </div>
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    settings.colorMode === 'yellow'
                      ? 'bg-amber-500 text-white'
                      : 'border border-neutral-300'
                  }`}
                >
                  {settings.colorMode === 'yellow' && <Check className="w-2.5 h-2.5" />}
                </div>
              </button>

              {/* Option C: Dark Gray (Night) */}
              <button
                type="button"
                onClick={() => handleColorModeChange('dark-gray')}
                className={`p-3 rounded-2xl border-2 text-center cursor-pointer flex flex-col items-center justify-between h-28 transition-all ios-spring-card ${
                  settings.colorMode === 'dark-gray'
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                    : 'border-neutral-200/80 hover:border-neutral-300 bg-white'
                }`}
              >
                {/* Visual miniature mockup */}
                <div className="w-12 h-10 rounded-lg bg-[#222225] border border-neutral-700 shadow-2xs flex flex-col justify-center items-center gap-1 p-1">
                  <div className="w-8 h-1 bg-neutral-500 rounded-full" />
                  <div className="w-6 h-1 bg-neutral-600 rounded-full" />
                </div>
                <div className="w-full">
                  <span
                    className={`text-xs font-bold block ${
                      settings.colorMode === 'dark-gray' ? 'text-white' : 'text-neutral-800'
                    }`}
                  >
                    طوسی تیره
                  </span>
                  <span
                    className={`text-[10px] block ${
                      settings.colorMode === 'dark-gray' ? 'text-neutral-400' : 'text-neutral-400'
                    }`}
                  >
                    حالت شب
                  </span>
                </div>
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    settings.colorMode === 'dark-gray'
                      ? 'bg-indigo-500 text-white'
                      : 'border border-neutral-300'
                  }`}
                >
                  {settings.colorMode === 'dark-gray' && <Check className="w-2.5 h-2.5" />}
                </div>
              </button>
            </div>
          </div>

          {/* 2. Brightness Section (روشنایی با اسلایدر کپسولی مینیمال اپل) */}
          <div className="p-4 bg-neutral-50/80 rounded-2xl border border-neutral-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>روشنایی صفحه</span>
              </span>
              <span className="text-xs font-mono font-bold text-neutral-800 tabular-nums bg-white px-2.5 py-0.5 rounded-lg border border-neutral-200">
                {settings.brightness}٪
              </span>
            </div>

            {/* Seamless Minimal Apple Capsule Slider */}
            <AppleCapsuleSlider
              value={settings.brightness}
              min={40}
              max={120}
              step={5}
              onChange={handleBrightnessChange}
              color="amber"
              unit="٪"
            />

            {/* Quick Presets row */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[
                { label: 'شب (۵۰٪)', val: 50 },
                { label: 'ملایم (۷۵٪)', val: 75 },
                { label: 'عادی (۱۰۰٪)', val: 100 },
                { label: 'روشن (۱۱۵٪)', val: 115 },
              ].map((p) => (
                <button
                  key={p.val}
                  type="button"
                  onClick={() => handleBrightnessChange(p.val)}
                  className={`py-1.5 text-[11px] rounded-xl font-bold cursor-pointer transition-all ios-spring-btn ${
                    settings.brightness === p.val
                      ? 'bg-amber-500 text-white shadow-2xs'
                      : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Warmth Sub-Slider (تنها هنگام فعال بودن کاغذ زرد نمایش داده می‌شود) */}
          {settings.colorMode === 'yellow' && (
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2.5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>گرمای رنگ زرد کاغذ</span>
                </span>
                <span className="text-xs font-mono font-bold text-amber-900 tabular-nums bg-white px-2.5 py-0.5 rounded-lg border border-amber-300">
                  {settings.warmth}٪
                </span>
              </div>

              <AppleCapsuleSlider
                value={settings.warmth}
                min={25}
                max={75}
                step={5}
                onChange={handleWarmthChange}
                color="amber"
                unit="٪"
              />
            </div>
          )}

          {/* 4. Compact Live Document Preview (پیش‌نمایش دم‌دست و کامپکت) */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-neutral-500 block">
              پیش‌نمایش بلادرنگ نمونه متن:
            </span>
            <div
              style={{
                filter: previewFilter,
                transition: 'background-color 0.2s, filter 0.2s',
              }}
              className={`p-3.5 rounded-2xl border shadow-xs transition-all ${previewBg}`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                <span>فصل اول: اصول یادگیری</span>
                <span className={`text-[10px] ${previewMuted}`}>صفحه ۱</span>
              </div>
              <p className="text-xs leading-relaxed mb-2">
                نور مناسب و رنگ بهینه کاغذ مانع از خشکی چشم در ساعت‌های متمادی مطالعه می‌شود.
              </p>
              <div className={`p-1.5 rounded-lg text-[11px] font-medium ${previewHighlight}`}>
                نکته: تنظیم نور صفحه با نور اتاق خستگی بینایی را به حداقل می‌رساند.
              </div>
            </div>
          </div>
        </div>

        {/* Footer (دکمه ذخیره و تایید ساده و شیک) */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between gap-3">
          <span className="text-xs text-neutral-400">
            تغییرات به صورت آنی روی فایل‌ها ذخیره می‌شود.
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold rounded-xl cursor-pointer shadow-xs ios-spring-btn"
          >
            تایید و بستن
          </button>
        </div>
      </div>
    </div>
  );
};
