import express from "express";
const router = express.Router();

router.get("/getquote", (req, res, next) => {
  const quoteList = [
    {
      author: "Albert Einstein",
      quote:
        "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    },
    {
      author: "Walt Disney",
      quote: "The way to get started is to quit talking and begin doing.",
    },
    {
      author: "Oscar Wilde",
      quote: "Be yourself; everyone else is already taken.",
    },
    {
      author: "Winston Churchill",
      quote:
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    },
    {
      author: "Maya Angelou",
      quote:
        "You will face many defeats in life, but never let yourself be defeated.",
    },
    {
      author: "Dr. Seuss",
      quote: "Don't cry because it's over, smile because it happened.",
    },
    {
      author: "Thomas Edison",
      quote: "I have not failed. I've just found 10,000 ways that won't work.",
    },
    {
      author: "Eleanor Roosevelt",
      quote:
        "The future belongs to those who believe in the beauty of their dreams.",
    },
    {
      author: "Mark Twain",
      quote: "Get your facts first, then you can distort them as you please.",
    },
    {
      author: "Nelson Mandela",
      quote: "It always seems impossible until it's done.",
    },
    { author: "Abraham Lincoln", quote: "Whatever you are, be a good one." },
    {
      author: "C.S. Lewis",
      quote:
        "You are never too old to set another goal or to dream a new dream.",
    },
    {
      author: "Groucho Marx",
      quote: "I refuse to join any club that would have me as a member.",
    },
    {
      author: "Mother Teresa",
      quote:
        "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    },
    {
      author: "Steve Jobs",
      quote: "The only way to do great work is to love what you do.",
    },
    {
      author: "Confucius",
      quote: "It does not matter how slowly you go as long as you do not stop.",
    },
    {
      author: "Robin Williams",
      quote:
        "You're only given a little spark of madness. You mustn't lose it.",
    },
    {
      author: "Henry Ford",
      quote: "Whether you think you can or you think you can’t, you’re right.",
    },
    {
      author: "Mark Zuckerberg",
      quote: "The biggest risk is not taking any risk.",
    },
    {
      author: "Jim Carrey",
      quote: "Behind every great man is a woman rolling her eyes.",
    },
    {
      author: "Anonymous",
      quote: "The best way to predict the future is to create it.",
    },
    { author: "Yoda", quote: "Do, or do not. There is no try." },
    {
      author: "Marilyn Monroe",
      quote:
        "Keep smiling, because life is a beautiful thing and there's so much to smile about.",
    },
    {
      author: "Bill Gates",
      quote:
        "Your most unhappy customers are your greatest source of learning.",
    },
    {
      author: "Charles Dickens",
      quote:
        "There is nothing in the world so irresistibly contagious as laughter and good humor.",
    },
    {
      author: "Dalai Lama",
      quote:
        "Happiness is not something ready-made. It comes from your own actions.",
    },
    {
      author: "Tony Robbins",
      quote:
        "Setting goals is the first step in turning the invisible into the visible.",
    },
    {
      author: "Charlie Chaplin",
      quote: "A day without laughter is a day wasted.",
    },
    {
      author: "Zig Ziglar",
      quote:
        "You don’t have to be great to start, but you have to start to be great.",
    },
    {
      author: "Buddha",
      quote:
        "Happiness does not depend on what you have or who you are. It solely relies on what you think.",
    },
    {
      author: "Vince Lombardi",
      quote:
        "The only place where success comes before work is in the dictionary.",
    },
    { author: "Socrates", quote: "An unexamined life is not worth living." },
    {
      author: "Arnold Schwarzenegger",
      quote:
        "The worst thing I can be is the same as everybody else. I hate that.",
    },
    {
      author: "John Lennon",
      quote: "Life is what happens when you're busy making other plans.",
    },
    {
      author: "J.K. Rowling",
      quote:
        "It is our choices that show what we truly are, far more than our abilities.",
    },
    { author: "Oprah Winfrey", quote: "Turn your wounds into wisdom." },
    {
      author: "Michael Jordan",
      quote:
        "I can accept failure, everyone fails at something. But I can't accept not trying.",
    },
    { author: "Anonymous", quote: "When nothing goes right, go left." },
    {
      author: "Napoleon Hill",
      quote:
        "Whatever the mind of man can conceive and believe, it can achieve.",
    },
    { author: "Woody Allen", quote: "80% of success is showing up." },
    { author: "Jim Rohn", quote: "Happiness is not by chance, but by choice." },
    {
      author: "Richard Branson",
      quote: "If your dreams don’t scare you, they are too small.",
    },
    { author: "Steve Martin", quote: "Be so good they can’t ignore you." },
    {
      author: "Will Rogers",
      quote:
        "Even if you’re on the right track, you’ll get run over if you just sit there.",
    },
    {
      author: "Ralph Waldo Emerson",
      quote:
        "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    },
    {
      author: "Mahatma Gandhi",
      quote:
        "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    },
    {
      author: "Benjamin Franklin",
      quote: "By failing to prepare, you are preparing to fail.",
    },
    {
      author: "Aesop",
      quote: "No act of kindness, no matter how small, is ever wasted.",
    },
    {
      author: "Will Smith",
      quote:
        "Too many people spend money they haven't earned, to buy things they don't want, to impress people they don't like.",
    },
    {
      author: "Leonardo da Vinci",
      quote: "Simplicity is the ultimate sophistication.",
    },
    {
      author: "Helen Keller",
      quote: "Keep your face to the sunshine and you cannot see a shadow.",
    },
    {
      author: "Richard Feynman",
      quote:
        "I would rather have questions that can’t be answered than answers that can’t be questioned.",
    },
    {
      author: "Harriet Tubman",
      quote: "Every great dream begins with a dreamer.",
    },
    {
      author: "Thomas Jefferson",
      quote: "I find that the harder I work, the more luck I seem to have.",
    },
    {
      author: "Anonymous",
      quote: "Why don’t skeletons fight each other? They don’t have the guts.",
    },
    {
      author: "George Carlin",
      quote: "I’m not into working out. My philosophy: No pain, no pain.",
    },
    { author: "Rumi", quote: "What you seek is seeking you." },
    {
      author: "Yogi Berra",
      quote: "When you come to a fork in the road, take it.",
    },
    {
      author: "Lao Tzu",
      quote: "The journey of a thousand miles begins with one step.",
    },
    {
      author: "Babe Ruth",
      quote: "Every strike brings me closer to the next home run.",
    },
    {
      author: "Ellen DeGeneres",
      quote:
        "My grandmother started walking five miles a day when she was sixty. She’s ninety-seven now, and we don’t know where the heck she is.",
    },
    {
      author: "Anonymous",
      quote:
        "If at first you don’t succeed, then skydiving definitely isn’t for you.",
    },
    { author: "J.R.R. Tolkien", quote: "Not all those who wander are lost." },
    {
      author: "Walt Whitman",
      quote:
        "Keep your face always toward the sunshine—and shadows will fall behind you.",
    },
    {
      author: "Henry David Thoreau",
      quote:
        "Go confidently in the direction of your dreams! Live the life you’ve imagined.",
    },
    {
      author: "Albert Schweitzer",
      quote:
        "Success is not the key to happiness. Happiness is the key to success.",
    },
    {
      author: "George Eliot",
      quote: "It is never too late to be what you might have been.",
    },
    {
      author: "Anonymous",
      quote: "If Cinderella’s shoe fit perfectly, then why did it fall off?",
    },
    {
      author: "David Brinkley",
      quote:
        "A successful man is one who can lay a firm foundation with the bricks others have thrown at him.",
    },
    {
      author: "Milton Berle",
      quote: "If opportunity doesn’t knock, build a door.",
    },
  ];

  const ind = Math.floor(Math.random() * quoteList.length + 1);

  res.status(200).json(quoteList[ind]);
});

export default router;
