import {
  createProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  getProjectByIdQuery,
  getProjectsOfUserQuery,
  getUserQuery,
  projectsQuery,
} from '@/graphql';
import { GraphQLClient, Variables } from 'graphql-request';
import { ProjectForm } from '../types';

interface IMakeGraphQlRequestArgs {
  query: string;
  variables: Variables;
}

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL!
  : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY!
  : 'letMeIn';
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

const makeGraphQlRequest = async ({
  query,
  variables = {},
}: IMakeGraphQlRequestArgs) => {
  try {
    // client request
    return await client.request(query, variables);
  } catch (error) {
    console.error(error);
  }
};

export const getUser = (email: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQlRequest({ query: getUserQuery, variables: { email } });
};

export const createUser = ({
  email,
  name,
  avatarUrl,
}: {
  email: string;
  name: string;
  avatarUrl: string;
}) => {
  client.setHeader('x-api-key', apiKey);

  const variables = {
    input: { name, email, avatarUrl },
  };
  return makeGraphQlRequest({ query: createUserMutation, variables });
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: 'POST',
      body: JSON.stringify({ path: imagePath }),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.result.url) {
    client.setHeader('Authorization', `Bearer ${token}`);

    const variables = {
      input: {
        ...form,
        image: imageUrl.result.url,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return makeGraphQlRequest({ query: createProjectMutation, variables });
  }
};

export const fetchAllProjects = async (
  category?: string | null,
  endcursor?: string | null
) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQlRequest({
    query: projectsQuery,
    variables: { category, endcursor },
  });
};

export const getProjectDetails = (id: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQlRequest({ query: getProjectByIdQuery, variables: { id } });
};

export const getUserProjects = (id: string, last?: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQlRequest({
    query: getProjectsOfUserQuery,
    variables: { id, last },
  });
};

export const deleteProject = (id: string, token: string) => {
  client.setHeader('Authorization', `Bearer ${token}`);

  return makeGraphQlRequest({
    query: deleteProjectMutation,
    variables: { id },
  });
};
