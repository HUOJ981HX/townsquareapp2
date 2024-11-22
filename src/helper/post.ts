export const filterCategories = {
    PERSONALS: "personals",
    WORK: "work",
}

export const postCriteriaIntentType = {
    FILTER: 'filter',
    POST: 'post',
}

export const filterCategoriesArray = [
    filterCategories.PERSONALS,
    filterCategories.WORK
]

export const filterPostRoles = {
    PROVIDER: 'provider',
    SEEKER: 'seeker',
    BOTH: 'both'
}

export const getFilterQueryRole = ({category, purpose, role} : any) => {
    // category: work, relationship, etc.
    // purpose: filter or post
    // role: provider, seeker or both

    console.log('ggggggggggggggggggggggg');
    console.log('ggggggggggggggggggggggg');
    console.log('sean_log category: ' + category);
    console.log('sean_log purpose: ' + purpose);
    console.log('sean_log chosenRole: ' + role);
    if (purpose === postCriteriaIntentType.FILTER) {
        if (filterPostMatcher.opposite.includes(category)) { 
            if (role === filterPostRoles.SEEKER) {
                return filterPostRoles.PROVIDER;
            }
            return filterPostRoles.SEEKER
        }
        return filterPostRoles.BOTH;
    }
    return role;
}

export const filterPostMatcher = {
    opposite: [
        filterCategories.WORK
    ],
    same: [
        filterCategories.PERSONALS,
    ]
}

export const personals = [
    {
        type: "checkbox",
        prompt: "What are your looking for?",
        options: [
            "Relationship",
            "Friends",
            "Casual"
        ],
    },
    {
        type: "checkbox",
        prompt: "Who are your looking for?",
        name: "gender: ",
        options: [
            "Male",
            "Female",
            "nonBinary"
        ],
    },
];


export const work = [
    {
        type: "radioButton",
        prompt: "Are you looking for or providing working?",
        chosenRolQuestion: true,
        options: [
            {
                value: filterPostRoles.PROVIDER,
                title: "providing"
            },
            {
                value: filterPostRoles.SEEKER,
                title: "looking"
            }
        ],
    },
    {
        type: "checkbox",
        prompt: "Which industry(ies)?",
        options: [
            "Accounting",
            "Manufacturing",
            "Service",
            "Tech"
        ]
    },
    {
        type: "radioButton",
        prompt: "pay range",
        options: [
            "under 50k",
            "50-75k",
            "75-100k",
            "over 100k"
        ]
    }
]