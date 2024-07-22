export const getWritingFromAbdoliService = async (writingType: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        cueId: '12345',
        question: 'What are your thoughts on this writing type?',
        writingType
    };
}

export const submitWritingToAbdoliService = async (userId: string, cueId: string, answer: string, reviewLevel: string) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log(userId, cueId, answer, reviewLevel);

    return { message: "we received you writing." }
}