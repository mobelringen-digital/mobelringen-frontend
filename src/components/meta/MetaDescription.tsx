interface Props {
  description: string;
}

export const MetaDescription: React.FC<Props> = ({ description }) => {
  return <meta name="description" content={description} />;
};
