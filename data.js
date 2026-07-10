const KSGLOW_IMAGES = {
  heroAccent: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1200',
  rosehip: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800',
  hyaluronic: 'https://images.pexels.com/photos/785695/pexels-photo-785695.jpeg?auto=compress&cs=tinysrgb&w=800',
  niacinamide: 'https://images.pexels.com/photos/13608713/pexels-photo-13608713.jpeg?auto=compress&cs=tinysrgb&w=800',
  ceramide: 'https://images.pexels.com/photos/2720447/pexels-photo-2720447.jpeg?auto=compress&cs=tinysrgb&w=800',
  galleryMorning: 'https://images.pexels.com/photos/4041389/pexels-photo-4041389.jpeg?auto=compress&cs=tinysrgb&w=1200',
  galleryTexture: 'https://images.pexels.com/photos/7479561/pexels-photo-7479561.jpeg?auto=compress&cs=tinysrgb&w=1200',
  galleryEvening: 'https://images.pexels.com/photos/7795891/pexels-photo-7795891.jpeg?auto=compress&cs=tinysrgb&w=1200',
  beforeRaw: 'https://images.pexels.com/photos/4041231/pexels-photo-4041231.jpeg?auto=compress&cs=tinysrgb&w=1200',
  afterRefined: 'https://images.pexels.com/photos/31552021/pexels-photo-31552021.jpeg?auto=compress&cs=tinysrgb&w=1200'
};

const KSGLOW_TESTIMONIALS = [
  {
    quote: "This serum changed everything. My skin has never felt more alive.",
    author: "Kristy",
    initials: "K",
    rating: 5
  },
  {
    quote: "The texture is unlike anything I've tried — absorbs instantly, no residue.",
    author: "Amara",
    initials: "A",
    rating: 5
  },
  {
    quote: "Three weeks in and my skin genuinely looks brighter. Worth every penny.",
    author: "Priya",
    initials: "P",
    rating: 5
  },
  {
    quote: "Finally a serum that doesn't irritate my sensitive skin. It's become non-negotiable.",
    author: "Sofia",
    initials: "S",
    rating: 4
  },
  {
    quote: "The ritual itself feels luxurious. Mornings feel different now.",
    author: "Meredith",
    initials: "M",
    rating: 5
  }
];

const KSGLOW_TRUST_BADGES = [
  { icon: 'fa-heart', label: 'Cruelty Free' },
  { icon: 'fa-leaf', label: '100% Vegan' },
  { icon: 'fa-user-md', label: 'Dermatologist Tested' },
  { icon: 'fa-undo', label: '30-Day Guarantee' }
];

const KSGLOW_HOW_IT_WORKS = [
  {
    step: 'Cleanse',
    time: 'Morning & evening',
    description: 'Start with clean, dry skin so the serum can absorb fully.'
  },
  {
    step: 'Apply',
    time: 'Three drops',
    description: 'Press gently into skin — no rubbing. Give it 60 seconds to settle.'
  },
  {
    step: 'Seal',
    time: 'Follow with moisturizer',
    description: 'Lock in hydration and let your natural glow build over time.'
  }
];

const KSGLOW_QUIZ = {
  questions: [
    {
      id: 'skinType',
      question: "How would you describe your skin?",
      options: [
        { label: 'Dry & tight', value: 'dry' },
        { label: 'Oily & shine-prone', value: 'oily' },
        { label: 'Combination', value: 'combo' },
        { label: 'Sensitive & reactive', value: 'sensitive' }
      ]
    },
    {
      id: 'concern',
      question: "What's your main concern right now?",
      options: [
        { label: 'Dullness & uneven tone', value: 'dullness' },
        { label: 'Fine lines & firmness', value: 'aging' },
        { label: 'Dehydration', value: 'hydration' },
        { label: 'Redness & sensitivity', value: 'redness' }
      ]
    },
    {
      id: 'routine',
      question: "How would you describe your current routine?",
      options: [
        { label: 'Minimal — cleanser and done', value: 'minimal' },
        { label: 'A few staples', value: 'moderate' },
        { label: 'Full multi-step ritual', value: 'extensive' }
      ]
    }
  ],
  resultFor(answers) {
    if (answers.concern === 'hydration' || answers.skinType === 'dry') {
      return {
        title: 'Deep Hydration Ritual',
        ingredient: 'Hyaluronic Acid',
        description: "Your skin is asking for moisture. Lead with our Hyaluronic Acid-forward routine — three drops morning and night, sealed with a rich moisturizer."
      };
    }
    if (answers.concern === 'redness' || answers.skinType === 'sensitive') {
      return {
        title: 'Barrier Repair Ritual',
        ingredient: 'Ceramide Complex',
        description: "Your skin needs calm, not intensity. Our Ceramide Complex formulation rebuilds your barrier gently, with zero known irritants."
      };
    }
    if (answers.concern === 'aging') {
      return {
        title: 'Renewal Ritual',
        ingredient: 'Niacinamide',
        description: "Firmness and resilience are the focus. Niacinamide supports your skin's natural renewal cycle without disrupting it."
      };
    }
    return {
      title: 'Radiance Ritual',
      ingredient: 'Rose Hip Extract',
      description: "Brightness is the goal. Rose Hip Extract's vitamin C boost is exactly the kind of glow-forward support your skin is calling for."
    };
  }
};
