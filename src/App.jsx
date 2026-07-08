import { useState, useEffect } from 'react';
import { menuData, DAYS, DAY_LABELS, DAY_FULL, MEALS } from './menuData';

/* ── Time Utilities ────────────────────────────────── */

function getCurrentMealInfo() {
    const now = new Date();
    const t = now.getHours() * 60 + now.getMinutes();

    // Active meal slots
    if (t >= 450 && t <= 540) return { meal: 'breakfast', active: true, label: 'Breakfast Time', timeLeft: 540 - t };
    if (t >= 720 && t <= 840) return { meal: 'lunch', active: true, label: 'Lunch Time', timeLeft: 840 - t };
    if (t >= 990 && t <= 1050) return { meal: 'snacks', active: true, label: 'Snacks Time', timeLeft: 1050 - t };
    if (t >= 1170 && t <= 1260) return { meal: 'dinner', active: true, label: 'Dinner Time', timeLeft: 1260 - t };

    // Between meals → show upcoming
    if (t < 450) return { meal: 'breakfast', active: false, label: 'Up Next — Breakfast' };
    if (t < 720) return { meal: 'lunch', active: false, label: 'Up Next — Lunch' };
    if (t < 990) return { meal: 'snacks', active: false, label: 'Up Next — Snacks' };
    if (t < 1170) return { meal: 'dinner', active: false, label: 'Up Next — Dinner' };

    // Don't show any popup/banner after 9 PM
    return null;
}

function getTodayKey() {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
}

function formatTime() {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

/* ── Header ────────────────────────────────────────── */

function Header({ time }) {
    return (
        <header className="header">
            <div className="header-glow" />
            <div className="header-content">
                <div className="header-icon">🍴</div>
                <h1 className="header-title">SRM Mess Menu</h1>
                <p className="header-subtitle">Student&apos;s Weekly Schedule</p>
                <div className="header-time">{time}</div>
            </div>
        </header>
    );
}

/* ── Current Meal Banner ───────────────────────────── */

function CurrentMealBanner({ mealInfo, items }) {
    if (!mealInfo) return null;
    const meta = MEALS.find(m => m.key === mealInfo.meal);
    if (!meta) return null;

    return (
        <div className={`banner banner--${mealInfo.meal} ${mealInfo.active ? 'banner--active' : ''}`}>
            <div className="banner-pulse" />
            <div className="banner-content">
                <div className="banner-status">
                    <span className={`banner-dot ${mealInfo.active ? 'dot--live' : ''}`} />
                    <span className="banner-label">
                        {mealInfo.active
                            ? `NOW SERVING • Ends in ${Math.floor(mealInfo.timeLeft / 60) > 0
                                ? `${Math.floor(mealInfo.timeLeft / 60)}h ${mealInfo.timeLeft % 60}m`
                                : `${mealInfo.timeLeft} mins`
                            }`
                            : 'COMING UP'}
                    </span>
                </div>
                <div className="banner-meal">
                    <span className="banner-emoji">{meta.emoji}</span>
                    <span className="banner-title">{mealInfo.label}</span>
                </div>
                <p className="banner-time">{meta.time}{mealInfo.tomorrow ? ' (Tomorrow)' : ''}</p>
                {mealInfo.active && items.length > 0 && (
                    <div className="banner-preview">
                        {items.slice(0, 4).map((item, i) => (
                            <span key={i} className={`chip chip--${mealInfo.meal}`}>{item}</span>
                        ))}
                        {items.length > 4 && (
                            <span className="chip chip--more">+{items.length - 4} more</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ── Day Selector ──────────────────────────────────── */

function DaySelector({ selected, today, onSelect }) {
    return (
        <nav className="day-selector">
            <div className="day-tabs">
                {DAYS.map(day => (
                    <button
                        key={day}
                        className={`day-tab ${selected === day ? 'day-tab--selected' : ''} ${today === day ? 'day-tab--today' : ''}`}
                        onClick={() => onSelect(day)}
                    >
                        <span className="day-tab-label">{DAY_LABELS[day]}</span>
                        {today === day && <span className="day-tab-badge">Today</span>}
                    </button>
                ))}
            </div>
        </nav>
    );
}

/* ── Meal Card ─────────────────────────────────────── */

function MealCard({ meal, items, isActive }) {
    const [expanded, setExpanded] = useState(isActive);

    useEffect(() => {
        setExpanded(isActive);
    }, [isActive]);

    return (
        <div
            className={`meal-card meal-card--${meal.key} ${isActive ? 'meal-card--active' : ''}`}
            id={`meal-${meal.key}`}
        >
            <button className="meal-card-header" onClick={() => setExpanded(!expanded)}>
                <div className="meal-card-left">
                    <span className="meal-card-emoji">{meal.emoji}</span>
                    <div>
                        <h3 className="meal-card-title">{meal.label}</h3>
                        <span className="meal-card-time">{meal.time}</span>
                    </div>
                </div>
                <div className="meal-card-right">
                    {isActive && <span className="live-badge">LIVE</span>}
                    <span className={`meal-card-arrow ${expanded ? 'arrow--open' : ''}`}>▾</span>
                </div>
            </button>

            <div className={`meal-card-body ${expanded ? 'body--open' : ''}`}>
                <div className="meal-card-items">
                    {items.map((item, i) => (
                        <span key={i} className={`chip chip--${meal.key}`}>
                            {item}
                        </span>
                    ))}
                    {items.length === 0 && (
                        <p className="no-items">No items listed</p>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ── Footer ────────────────────────────────────────── */

function Footer({ count }) {
    return (
        <footer className="footer">
            <div className="footer-content">
                {count !== null && (
                    <div className="visitor-counter">
                        <span className="visitor-icon">👥</span>
                        <span className="visitor-count">{count.toLocaleString()}</span>
                        <span className="visitor-label">visitors</span>
                    </div>
                )}
                <div className="footer-divider" />
                <p className="footer-credit">
                    Developed by <span className="footer-name">Parth Maheshwari</span>
                </p>
                <p className="footer-note">Menu from 01.07.2026 • Subject to availability</p>
            </div>
        </footer>
    );
}

/* ── App ───────────────────────────────────────────── */

export default function App() {
    const today = getTodayKey();
    const [selectedDay, setSelectedDay] = useState(DAYS.includes(today) ? today : 'monday');
    const [mealInfo, setMealInfo] = useState(getCurrentMealInfo());
    const [currentTime, setCurrentTime] = useState(formatTime());
    const [visitorCount, setVisitorCount] = useState(null);

    // Update clock + meal info every 30s
    useEffect(() => {
        const timer = setInterval(() => {
            setMealInfo(getCurrentMealInfo());
            setCurrentTime(formatTime());
        }, 30000);
        return () => clearInterval(timer);
    }, []);

    // Auto-scroll to active meal on load
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (mealInfo?.meal) {
                const el = document.getElementById(`meal-${mealInfo.meal}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 600);
        return () => clearTimeout(timeout);
    }, []); // only on mount

    // Fetch visitor count
    useEffect(() => {
        fetch('/api/visit')
            .then(r => r.json())
            .then(d => { if (d.count) setVisitorCount(d.count); })
            .catch(() => { });
    }, []);

    const getMenuForDay = (day) => {
        let menu = menuData[day] || {};
        if (day === 'wednesday') {
            const todayDate = new Date();
            const diff = 3 - todayDate.getDay(); // 3 is Wednesday
            const wedDate = new Date(todayDate);
            wedDate.setDate(todayDate.getDate() + diff);
            const dateOfMonth = wedDate.getDate();
            const is2ndOr4th = (dateOfMonth >= 8 && dateOfMonth <= 14) || (dateOfMonth >= 22 && dateOfMonth <= 28);

            if (is2ndOr4th && menu.dinner) {
                menu = {
                    ...menu,
                    dinner: menu.dinner.map(item => item === 'PANEER BUTTER MASALA' ? 'VEG PANEER BIRYANI' : item)
                };
            }
        }
        return menu;
    };

    const dayMenu = getMenuForDay(selectedDay);
    const todayMenu = getMenuForDay(today);
    const bannerItems = mealInfo?.meal ? (todayMenu[mealInfo.meal] || []) : [];

    return (
        <div className="app">
            <div className="bg-grid" />
            <div className="bg-blob bg-blob--1" />
            <div className="bg-blob bg-blob--2" />
            <div className="bg-blob bg-blob--3" />

            <div className="container">
                <Header time={currentTime} />

                <CurrentMealBanner mealInfo={mealInfo} items={bannerItems} />

                <DaySelector selected={selectedDay} today={today} onSelect={setSelectedDay} />

                <div className="day-heading">
                    <h2>{DAY_FULL[selectedDay]}&apos;s Menu</h2>
                    <span className="meal-count">{MEALS.length} meals</span>
                </div>

                <div className="meals-grid">
                    {MEALS.map(meal => (
                        <MealCard
                            key={meal.key}
                            meal={meal}
                            items={dayMenu[meal.key] || []}
                            isActive={selectedDay === today && mealInfo?.meal === meal.key}
                        />
                    ))}
                </div>

                <Footer count={visitorCount} />
            </div>
        </div>
    );
}
