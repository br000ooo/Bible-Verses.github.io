const verseTextNormal = document.getElementById('verse-text-normal');
const verseReferenceNormal = document.getElementById('verse-reference-normal');
const verseTextAthlete = document.getElementById('verse-text-athlete');
const verseReferenceAthlete = document.getElementById('verse-reference-athlete');
const verseTextDepression = document.getElementById('verse-text-depression');
const verseReferenceDepression = document.getElementById('verse-reference-depression');
const buttonNormal = document.getElementById('button-normal');
const buttonAthlete = document.getElementById('button-athlete');
const buttonDepression = document.getElementById('button-depression');

// Topic references for special topics
const topicReferences = {
    "athlete": [
        "1 Corinthians 9:24-27",
        "Philippians 4:13",
        "Isaiah 40:31",
        "2 Timothy 4:7",
        "Hebrews 12:1",
        "Colossians 3:23",
        "Proverbs 24:16",
        "Joshua 1:9",
        "Psalm 18:32-34",
        "Romans 5:3-5"
    ],
    "depression": [
        "Psalm 34:18",
        "1 Peter 5:7",
        "Psalm 94:19",
        "Matthew 11:28",
        "Psalm 147:3",
        "Psalm 23:4",
        "Isaiah 41:10",
        "John 16:33",
        "Romans 8:38-39",
        "Joshua 1:9"
    ],
    "anxiety": [
        "Philippians 4:6-7",
        "Matthew 6:34",
        "1 Peter 5:7",
        "John 14:27",
        "Psalm 94:19",
        "Isaiah 41:10"
    ],
    "grief": [
        "Matthew 5:4",
        "Psalm 34:18",
        "Revelation 21:4",
        "Psalm 147:3",
        "John 16:22"
    ],
    "stress": [
        "Matthew 11:28-30",
        "Philippians 4:6-7",
        "Psalm 55:22",
        "1 Peter 5:7",
        "John 14:27"
    ],
    "sadness": [
        "Psalm 30:5",
        "Psalm 34:17",
        "Revelation 21:4",
        "John 16:20",
        "Psalm 147:3"
    ],
    "pain": [
        "Romans 8:18",
        "2 Corinthians 4:17",
        "Psalm 34:19",
        "Revelation 21:4",
        "Psalm 147:3"
    ],
    "loneliness": [
        "Deuteronomy 31:6",
        "Psalm 25:16",
        "Matthew 28:20",
        "Isaiah 41:10",
        "Psalm 68:6"
    ],
    "fear": [
        "Isaiah 41:10",
        "Psalm 56:3",
        "2 Timothy 1:7",
        "Joshua 1:9",
        "Psalm 23:4"
    ],
    "anger": [
        "Ephesians 4:26-27",
        "James 1:19-20",
        "Proverbs 15:1",
        "Proverbs 29:11",
        "Psalm 37:8"
    ],
    "addiction": [
        "1 Corinthians 10:13",
        "Romans 6:14",
        "Galatians 5:1",
        "John 8:36",
        "Philippians 4:13"
    ],
    "self-worth": [
        "Psalm 139:13-14",
        "Jeremiah 29:11",
        "Romans 8:38-39",
        "Ephesians 2:10",
        "1 Peter 2:9"
    ],
    "forgiveness": [
        "Ephesians 4:32",
        "1 John 1:9",
        "Colossians 3:13",
        "Luke 6:37",
        "Psalm 103:12"
    ],
    "hope": [
        "Jeremiah 29:11",
        "Romans 15:13",
        "Psalm 39:7",
        "Isaiah 40:31",
        "Romans 5:5"
    ],
    "love": [
        "1 Corinthians 13:4-7",
        "1 John 4:7-8",
        "Romans 5:8",
        "John 15:12",
        "Colossians 3:14"
    ],
    "marriage": [
        "Ephesians 5:25",
        "1 Corinthians 13:4-7",
        "Genesis 2:24",
        "Colossians 3:14",
        "1 Peter 4:8"
    ],
    "children": [
        "Proverbs 22:6",
        "Psalm 127:3",
        "Matthew 19:14",
        "Ephesians 6:4",
        "Deuteronomy 6:6-7"
    ],
    "finances": [
        "Philippians 4:19",
        "Matthew 6:33",
        "Proverbs 3:9-10",
        "Luke 6:38",
        "2 Corinthians 9:8"
    ],
    "work": [
        "Colossians 3:23",
        "Proverbs 16:3",
        "Ecclesiastes 9:10",
        "Proverbs 14:23",
        "1 Corinthians 15:58"
    ],
    "leadership": [
        "1 Timothy 4:12",
        "Proverbs 11:14",
        "Philippians 2:3-4",
        "Matthew 20:26",
        "Joshua 1:9"
    ],
    "decision-making": [
        "James 1:5",
        "Proverbs 3:5-6",
        "Psalm 32:8",
        "Isaiah 30:21",
        "Philippians 4:6"
    ],
    "time-management": [
        "Ephesians 5:15-16",
        "Psalm 90:12",
        "Colossians 4:5",
        "Proverbs 16:9",
        "Matthew 6:33"
    ],
    "health": [
        "3 John 1:2",
        "Proverbs 17:22",
        "1 Corinthians 6:19-20",
        "Proverbs 4:20-22",
        "Isaiah 40:29"
    ]
};

// Helper: Capitalize topic for display
function capitalizeTopic(topic) {
    return topic.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// Fetch a random verse for a topic (if topicReferences exists), else random verse
async function showVerse(topic) {
    const textId = `verse-text-${topic}`;
    const refId = `verse-reference-${topic}`;
    const verseText = document.getElementById(textId);
    const verseReference = document.getElementById(refId);

    verseText.textContent = "Loading...";
    verseReference.textContent = "";

    // If topic has references, pick one and fetch it
    if (topicReferences[topic]) {
        const refs = topicReferences[topic];
        const ref = refs[Math.floor(Math.random() * refs.length)];
        try {
            const response = await fetch(`https://labs.bible.org/api/?passage=${encodeURIComponent(ref)}&type=json`);
            const data = await response.json();
            if (data && data.length > 0) {
                // If the passage returns multiple verses, join them
                const text = data.map(v => v.text.trim()).join(" ");
                const reference = `${data[0].bookname} ${data[0].chapter}:${data[0].verse}` +
                    (data.length > 1 ? `-${data[data.length-1].verse}` : "");
                verseText.textContent = `"${text}"`;
                verseReference.textContent = reference;
            } else {
                verseText.textContent = "No verse found.";
                verseReference.textContent = "";
            }
        } catch (e) {
            verseText.textContent = "Failed to fetch verse.";
            verseReference.textContent = "";
        }
    } else {
        // Otherwise, fetch a truly random verse
        try {
            const response = await fetch('https://labs.bible.org/api/?passage=random&type=json');
            const data = await response.json();
            if (data && data.length > 0) {
                const verse = data[0];
                verseText.textContent = `"${verse.text.trim()}"`;
                verseReference.textContent = `${verse.bookname} ${verse.chapter}:${verse.verse}`;
            } else {
                verseText.textContent = "No verse found.";
                verseReference.textContent = "";
            }
        } catch (e) {
            verseText.textContent = "Failed to fetch verse.";
            verseReference.textContent = "";
        }
    }
}

// List all topics (from your HTML)
const topics = [
    "normal",
    "athlete",
    "depression",
    "anxiety",
    "grief",
    "stress",
    "sadness",
    "pain",
    "loneliness",
    "fear",
    "anger",
    "addiction",
    "self-worth",
    "forgiveness",
    "hope",
    "love",
    "marriage",
    "children",
    "finances",
    "work",
    "leadership",
    "decision-making",
    "time-management",
    "health"
];

// On page load, show a verse for each topic
topics.forEach(topic => {
    showVerse(topic);
    // Add event listener for button
    const btn = document.getElementById(`button-${topic}`);
    if (btn) {
        btn.addEventListener('click', () => showVerse(topic));
    }
});