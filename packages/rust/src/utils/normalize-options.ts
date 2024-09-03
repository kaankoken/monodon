import { getWorkspaceLayout, Tree } from '@nx/devkit';
import snake_case from './snake_case';

export interface NormalizedSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
  targetDir: string;
}

export function normalizeOptions<
  T extends {
    name: string;
    edition?: '2015' | '2018' | '2021';
    tags?: string;
    directory?: string;
    useKebabCase?: boolean;
  }
>(tree: Tree, type: 'app' | 'lib', options: T): NormalizedSchema & T {
  const useKebabCase = options.useKebabCase ?? false;
  const name = snake_case(options.name, useKebabCase);
  const projectDirectory = options.directory
    ? `${options.directory
      .split('/')
      .map((p) => snake_case(p, useKebabCase))
      .join('/')}/${name}`
    : name;
  const projectName = projectDirectory.replace(
    new RegExp('/', 'g'),
    useKebabCase ? '-' : '_'
  );

  const { appsDir, libsDir } = getWorkspaceLayout(tree);
  let baseDir = '';
  if (appsDir && libsDir) {
    baseDir = (type === 'app' ? appsDir : libsDir) + '/';
  }
  const projectRoot = `${baseDir}${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  // rust specifics
  options.edition ??= '2021';
  const targetDir = `dist/target/${projectName}`;

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    targetDir,
  };
}
