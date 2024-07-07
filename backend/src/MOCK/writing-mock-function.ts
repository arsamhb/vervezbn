export const getWritingFromAbdoliService = async (writingType: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        cueId: '12345',
        question: 'What are your thoughts on this writing type?',
        writingType
    };
} 