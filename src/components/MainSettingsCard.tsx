import React from 'react';
import {
  Sliders,
  Sun,
  Moon,
  Eye,
  Keyboard,
  Clock,
  Sparkles,
  RotateCcw,
  Check,
  ChevronLeft,
  Hand,
  MousePointer,
  PenTool,
  Highlighter,
  Ruler,
  Eraser,
  StickyNote,
} from 'lucide-react';
import { EyeComfortSettings, ToolShortcuts, EyeComfortMode, PomodoroMode } from '../types';
import { AppleCapsuleSlider } from './AppleCapsuleSlider';
import { FlatHandIcon } from './FlatHandIcon';

interface MainSettingsCardProps {
  eyeComfortSettings: EyeComfortSettings;
  onUpdateEyeComfortSettings: (newSettings: EyeComfortSettings) => void;
  onOpenEyeComfortModal: () => void;
  shortcuts?: ToolShortcuts;
  onResetShortcuts?: () => void;
  pomodoroState?: {
    isRunning: boolean;
    timeLeft: number;
    mode: PomodoroMode;
    onTogglePlay: () => void;
  };
  className?: string;
}

export const MainSettingsCard: React.FC<MainSettingsCardProps> = ({
  eyeComfortSettings,
  onUpdateEyeComfortSettings,
  onOpenEyeComfortModal,
  shortcuts,
  onResetShortcuts,
  pomodoroState,
  className = '',
}) => {
  const handleBrightnessChange = (brightness: number) => {
    onUpdateEyeComfortSettings({
      ...eyeComfortSettings,
      brightness,
    });
  };

  const handleColorModeChange = (colorMode: EyeComfortMode) => {
    onUpdateEyeComfortSettings({
      ...eyeComfortSettings,
      colorMode,
    });
  };

  const handleResetSettings = () => {
    onUpdateEyeComfortSettings({
      brightness: 100,
      colorMode: 'normal',
      warmth: 50,
    });
    if (onResetShortcuts) {
      onResetShortcuts();
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-neutral-200/90 p-5 md:p-6 shadow-xs space-y-6 select-none ios-spring-card animate-ios-jelly ${className}`}
    >
      {/* Card Header: Apple Style */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-2xs shrink-0">
            <Sliders className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm md:text-base font-bold text-neutral-900">
                تنظیمات و شخصی‌سازی فضای مطالعه
              </h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-full">
                تم iOS
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              مدیریت نور صفحه، فیلترهای ضد خستگی، پومودورو و شورتکات‌های کیبورد
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {(eyeComfortSettings.colorMode !== 'normal' || eyeComfortSettings.brightness !== 100) && (
            <button
              onClick={handleResetSettings}
              className="px-2.5 py-1.5 text-xs text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg cursor-pointer flex items-center gap-1 ios-spring-btn"
              title="بازنشانی نور و تم به پیش‌فرض"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>پیش‌فرض</span>
            </button>
          )}

          <button
            onClick={onOpenEyeComfortModal}
            className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5 shadow-2xs ios-spring-btn"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>تنظیمات پیشرفته نور</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid: 2 Columns on md+ screens */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (Lg: 7 cols): Big Apple Capsule Slider & Theme Modes */}
        <div className="lg:col-span-7 space-y-4">
          {/* Subheader */}
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>روشنایی صفحه و جزوه (اسلایدر کپسولی اپل)</span>
            </label>
            <span className="text-xs font-mono font-bold text-neutral-800 tabular-nums bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-lg">
              {eyeComfortSettings.brightness}٪
            </span>
          </div>

          {/* Big Apple iOS Capsule Slider */}
          <AppleCapsuleSlider
            value={eyeComfortSettings.brightness}
            min={40}
            max={120}
            step={5}
            onChange={handleBrightnessChange}
            color="amber"
            unit="٪"
            leftIcon={<Sun className="w-4 h-4 text-neutral-400" />}
            rightIcon={<Sun className="w-5 h-5 text-amber-500" />}
          />

          {/* Color Themes for Paper / Eye Comfort */}
          <div className="pt-2">
            <span className="text-[11px] font-bold text-neutral-700 block mb-2">
              حالت رنگ و پس‌زمینه صفحات:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {/* 1. Normal White */}
              <button
                type="button"
                onClick={() => handleColorModeChange('normal')}
                className={`p-2.5 rounded-xl border text-center cursor-pointer ios-spring-btn flex flex-col items-center gap-1 ${
                  eyeComfortSettings.colorMode === 'normal'
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                    : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-neutral-200'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white border border-neutral-300 flex items-center justify-center">
                  {eyeComfortSettings.colorMode === 'normal' && (
                    <Check className="w-3 h-3 text-neutral-900" />
                  )}
                </div>
                <span className="text-xs font-semibold">سفید روز</span>
                <span className="text-[10px] opacity-75">استاندارد</span>
              </button>

              {/* 2. Yellow Paper */}
              <button
                type="button"
                onClick={() => handleColorModeChange('yellow')}
                className={`p-2.5 rounded-xl border text-center cursor-pointer ios-spring-btn flex flex-col items-center gap-1 ${
                  eyeComfortSettings.colorMode === 'yellow'
                    ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                    : 'bg-[#fcf8ec] hover:bg-[#fbf4de] text-amber-950 border-amber-200'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#fbf4de] border border-amber-300 flex items-center justify-center">
                  {eyeComfortSettings.colorMode === 'yellow' && (
                    <Check className="w-3 h-3 text-amber-900" />
                  )}
                </div>
                <span className="text-xs font-semibold">کاغذ زرد</span>
                <span className="text-[10px] opacity-75">ضد خستگی</span>
              </button>

              {/* 3. Dark Gray Night */}
              <button
                type="button"
                onClick={() => handleColorModeChange('dark-gray')}
                className={`p-2.5 rounded-xl border text-center cursor-pointer ios-spring-btn flex flex-col items-center gap-1 ${
                  eyeComfortSettings.colorMode === 'dark-gray'
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs ring-2 ring-indigo-400/30'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border-neutral-700'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#242426] border border-neutral-600 flex items-center justify-center">
                  {eyeComfortSettings.colorMode === 'dark-gray' && (
                    <Check className="w-3 h-3 text-indigo-300" />
                  )}
                </div>
                <span className="text-xs font-semibold">طوسی شب</span>
                <span className="text-[10px] opacity-75">تاریک ملایم</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Lg: 5 cols): Pomodoro Status & Shortcuts Overview */}
        <div className="lg:col-span-5 space-y-4 lg:border-r lg:border-neutral-100 lg:pr-5">
          {/* Pomodoro Quick Mini Widget */}
          {pomodoroState && (
            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-700" />
                  <span>تایمر پومودورو:</span>
                </span>
                <span className="font-mono font-bold tabular-nums text-neutral-900 text-sm">
                  {String(Math.floor(pomodoroState.timeLeft / 60)).padStart(2, '0')}:
                  {String(pomodoroState.timeLeft % 60).padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-neutral-500">
                  حالت: {pomodoroState.mode === 'focus' ? 'تمرکز مطالعه' : 'استراحت'}
                </span>
                <button
                  type="button"
                  onClick={pomodoroState.onTogglePlay}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-1 ios-spring-btn ${
                    pomodoroState.isRunning
                      ? 'bg-neutral-200 hover:bg-neutral-300 text-neutral-900'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                  }`}
                >
                  {pomodoroState.isRunning ? 'توقف' : 'شروع'}
                </button>
              </div>
            </div>
          )}

          {/* Quick Shortcuts Reference */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                <Keyboard className="w-3.5 h-3.5 text-neutral-700" />
                <span>کلیدهای میانبر سریع کیبورد:</span>
              </span>
              <span className="text-[10px] text-neutral-400">انگلیسی یا فارسی</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <div className="p-1.5 bg-neutral-50 border border-neutral-100 rounded-lg flex items-center justify-between">
                <span className="text-neutral-600 flex items-center gap-1">
                  <FlatHandIcon className="w-3 h-3 text-neutral-500" />
                  <span>دست</span>
                </span>
                <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded font-mono font-bold text-[10px] text-neutral-800 shadow-2xs">
                  {shortcuts?.hand || '1'}
                </kbd>
              </div>

              <div className="p-1.5 bg-neutral-50 border border-neutral-100 rounded-lg flex items-center justify-between">
                <span className="text-neutral-600 flex items-center gap-1">
                  <MousePointer className="w-3 h-3 text-neutral-500" />
                  <span>انتخاب</span>
                </span>
                <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded font-mono font-bold text-[10px] text-neutral-800 shadow-2xs">
                  {shortcuts?.select || '2'}
                </kbd>
              </div>

              <div className="p-1.5 bg-neutral-50 border border-neutral-100 rounded-lg flex items-center justify-between">
                <span className="text-neutral-600 flex items-center gap-1">
                  <PenTool className="w-3 h-3 text-neutral-500" />
                  <span>قلم</span>
                </span>
                <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded font-mono font-bold text-[10px] text-neutral-800 shadow-2xs">
                  {shortcuts?.pen || '3'}
                </kbd>
              </div>

              <div className="p-1.5 bg-neutral-50 border border-neutral-100 rounded-lg flex items-center justify-between">
                <span className="text-neutral-600 flex items-center gap-1">
                  <Highlighter className="w-3 h-3 text-neutral-500" />
                  <span>هایلایتر</span>
                </span>
                <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded font-mono font-bold text-[10px] text-neutral-800 shadow-2xs">
                  {shortcuts?.highlighter || '4'}
                </kbd>
              </div>

              <div className="p-1.5 bg-neutral-50 border border-neutral-100 rounded-lg flex items-center justify-between">
                <span className="text-neutral-600 flex items-center gap-1">
                  <Ruler className="w-3 h-3 text-neutral-500" />
                  <span>خط‌کش</span>
                </span>
                <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded font-mono font-bold text-[10px] text-neutral-800 shadow-2xs">
                  {shortcuts?.ruler || '5'}
                </kbd>
              </div>

              <div className="p-1.5 bg-neutral-50 border border-neutral-100 rounded-lg flex items-center justify-between">
                <span className="text-neutral-600 flex items-center gap-1">
                  <Eraser className="w-3 h-3 text-neutral-500" />
                  <span>پاک‌کن</span>
                </span>
                <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded font-mono font-bold text-[10px] text-neutral-800 shadow-2xs">
                  {shortcuts?.eraser || '6'}
                </kbd>
              </div>

              <div className="p-1.5 bg-neutral-50 border border-neutral-100 rounded-lg flex items-center justify-between col-span-2">
                <span className="text-neutral-600 flex items-center gap-1">
                  <StickyNote className="w-3 h-3 text-amber-500" />
                  <span>یادداشت چسبان</span>
                </span>
                <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded font-mono font-bold text-[10px] text-neutral-800 shadow-2xs">
                  {shortcuts?.stickyNote || '7'}
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
