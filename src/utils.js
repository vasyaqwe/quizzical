export const difficultyOptions = [
    { label: 'Easy', value: 1 },
    { label: 'Medium', value: 2 },
    { label: 'Hard', value: 3 },
]
export const categoryOptions = [
    { label: 'Any Category', value: 1 },
    { label: 'General Knowledge', value: 2 },
    { label: 'Entertainment: Books', value: 3 },
    { label: 'Entertainment: Film', value: 4 },
    { label: 'Entertainment: Music', value: 5 },
    { label: 'Entertainment: Musicals & Theatres', value: 6 },
    { label: 'Entertainment: Television', value: 7 },
    { label: 'Entertainment: Video Games', value: 8 },
    { label: 'Entertainment: Board Games', value: 9 },
    { label: 'Science & Nature', value: 10 },
    { label: 'Science: Computers', value: 11 },
    { label: 'Science: Mathematics', value: 12 },
    { label: 'Mythology', value: 13 },
    { label: 'Sports', value: 14 },
    { label: 'Geography', value: 15 },
    { label: 'History', value: 16 },
    { label: 'Politics', value: 17 },
    { label: 'Art', value: 18 },
    { label: 'Celebrities', value: 19 },
    { label: 'Animals', value: 20 },
    { label: 'Vehicles', value: 21 },
    { label: 'Entertainment: Comics', value: 22 },
    { label: 'Science: Gadgets', value: 23 },
    { label: 'Entertainment: Japanese Anime & Manga', value: 24 },
    { label: 'Entertainment: Cartoon & Animations', value: 25 }

]
export const shuffleArray = arr => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
}

export const parseEntities = txt => new DOMParser().parseFromString(txt, 'text/html').body.innerText