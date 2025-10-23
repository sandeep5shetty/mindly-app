interface CardProps {
  title: string;
  description: string;
  link?: string;
}

export default function CardComponent({ title, description, link }: CardProps) {
  return (
    <div className="max-w-72 m-2 bg-gray-200 text-neutral-900 p-2 rounded-md">
      <h2 className="text-3xl font-medium py-2">{title}</h2>
      <p>{description}</p>
    </div>
  );
}
