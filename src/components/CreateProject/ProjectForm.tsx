'use client';
import { ProjectInterface, SessionInterface } from '@/shared/types';
import FormField from '@/shared/ui/Form/FormField';
import Image from 'next/image';
import React, { useState } from 'react';
import CustomMenu from './CustomMenu';
import { categoryFilters } from '@/shared/constants';
import Button from '../Shared/Button';
import {
  createNewProject,
  fetchToken,
  updateProject,
} from '@/shared/lib/actions';
import { useRouter } from 'next/navigation';

interface IProps {
  session: SessionInterface;
  type: 'create' | 'edit';
  project?: ProjectInterface;
}

const ProjectForm = ({ session, type, project }: IProps) => {
  const formInitialValues = {
    image: project?.image || '',
    title: project?.title || '',
    description: project?.description || '',
    liveSiteUrl: project?.liveSiteUrl || '',
    githubUrl: project?.githubUrl || '',
    category: project?.category || '',
  };

  const [form, setForm] = useState(formInitialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === 'create') {
        await createNewProject(form, session?.user?.id, token);
        router.push('/');
      }

      if (type === 'edit') {
        if (!project) return;
        await updateProject(project.id, form, token);
        router.push('/');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.item(0);
    if (!file) return;
    if (!file.type.includes('image')) {
      return alert('Please upload an image file');
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange('image', result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <form onSubmit={handleFormSubmit} className=" flexStart form">
      <div className=" flexStart form_image-container">
        <label htmlFor="poster" className=" flexCenter form_image-label">
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          required={type === 'create'}
          className=" form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            alt="poster"
            className=" sm:p-10 object-contain z-20"
            fill
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Trickle"
        setState={(value) => handleStateChange('title', value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer"
        setState={(value) => handleStateChange('description', value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://next.pro"
        setState={(value) => handleStateChange('liveSiteUrl', value)}
      />
      <FormField
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/next"
        setState={(value) => handleStateChange('githubUrl', value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />

      <div className=" flexStart w-full">
        <Button
          type="submit"
          title={
            isSubmitting
              ? `${type === 'create' ? 'Creating' : 'Editing'}`
              : `${type === 'create' ? 'Create' : 'Edit'}`
          }
          isSubmitting={isSubmitting}
          leftIcon={isSubmitting ? '' : '/plus.svg'}
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
