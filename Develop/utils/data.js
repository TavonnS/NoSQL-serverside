const sampleUsers = [
    {
      username: 'Johnathan',
      email: 'J@email.com',
      thoughts: [],
      friends: [],
    },
    {
      username: 'Sophia',
      email: 'S@email.com',
      thoughts: [],
      friends: [],
    },
    {
      username: 'Derek',
      email: 'D@email.com',
      thoughts: [],
      friends: [],
    },
    // Add more users as needed
  ];
  
  const sampleThoughts = [
    {
      thoughtText: 'This is my first thought!',
      username: 'Sophia',
      reactions: [],
    },
    {
      thoughtText: 'Feeling excited about something!',
      username: 'Derek',
      reactions: [],
    },
    {
      thoughtText: 'Have you seen this article?!',
      username: 'Johnathan',
      reactions: [],
    },
    {
      thoughtText: 'This is brand new!',
      username: 'Sophia',
      reactions: [],
    },
    // Add more thoughts as needed
  ];
  
  const sampleReactions = [
    {
      reactionBody: 'I agree!',
      username: 'Sophia',
      thoughtIndex: 0, // reference to the first thought in sampleThoughts
    },
    {
      reactionBody: 'Interesting perspective.',
      username: 'Derek',
      thoughtIndex: 1, // reference to the second thought in sampleThoughts
    },
    // Add more reactions as needed
  ];
  
  module.exports = { sampleUsers, sampleThoughts, sampleReactions };
  