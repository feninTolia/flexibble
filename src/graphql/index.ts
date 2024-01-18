export const createProjectMutation = `
mutation CreateProject(
  $input: ProjectCreateInput!
) {
  mongoDB {
    projectCreate(input: $input) {
      insertedId
    }
  }
}
`;

export const updateProjectMutation = `
	mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
   mongoDB {
		projectUpdate(by: { id: $id }, input: $input) {
		  matchedCount
		}
   }
	}
`;

export const deleteProjectMutation = `
  mutation DeleteProject($id: ID!) {
   mongoDB {
    projectDelete(by: { id: $id }) {
      deletedCount
    }
   }
  }
`;

export const allProjectsQuery = `
query GetAllProjects ($endCursor: String) {
  mongoDB {
    projectCollection(first: 15, after: $endCursor) {
         pageInfo {
         hasNextPage
         hasPreviousPage
         startCursor
         endCursor
      }
      edges {
        node {
          id
          title
          description
          image
          liveSiteUrl
          githubUrl
          category
          createdBy {
            name
            email
            avatarUrl
          }
        }
      }
    }
  }
}
`;

export const projectsQuery = `
 query getProjects($category: String, $endCursor: String) {
    mongoDB {
  projectCollection(first: 15, after: $endCursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          description
          liveSiteUrl
          id
          image
          category
          createdBy {
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
  }
`;

export const getProjectByIdQuery = `
query GetProjectById ($id: ID!) {
  mongoDB {
    project(by: {id:$id}) {
      id
      title
      description
      image
      liveSiteUrl
      githubUrl
      category
      createdBy {
        email
        name
        avatarUrl
      }
    }
  }
}
`;

export const createUserMutation = `
	mutation MongoDB ($input: UserCreateInput!) {
  mongoDB {
    userCreate(input: $input) {
      insertedId,
    }
  }
}
`;

export const getUserQuery = `
  query GetUser($email: String!) {
   mongoDB {
    user(by: { email: $email }) {
      id
      name
      email
      avatarUrl
      description
      githubUrl
      linkedinUrl
    }
  }
  }
`;

export const getProjectsOfUserQuery = `
query GetUserProjectByEmail ($email:String!) {
  mongoDB {
    projectCollection(filter: {createdBy:{email:{eq:$email}}}, first: 50) {
      edges {
        node {
          title
          id
          description
          image
          liveSiteUrl
          githubUrl
          category
          createdBy {
            name
            email
            avatarUrl
          }
        }
      }
    }
  }
}
`;
