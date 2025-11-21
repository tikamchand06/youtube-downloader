import appData from "@/app/data.json";
import * as Icons from "lucide-react";

export default function Features() {
  return (
    <section id='features' className='app-features py-8 px-4 sm:px-6 lg:px-8 bg-background'>
      <div className='max-w-3xl mx-auto text-center mb-16'>
        <h2 className='text-4xl sm:text-5xl font-bold mb-4 text-foreground text-balance'>Features</h2>
        <p className='text-md font-medium dark:text-foreground/80'>Explore the powerful features of our YouTube Downloader.</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto'>
        {appData.features.map(({ title, description, icon }) => {
          const DynamicIcon = Icons[icon];

          return (
            <div
              key={title}
              className='p-6 bg-card text-center border-border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-gray-900'
            >
              <div className='feature-icon mb-4'>
                <DynamicIcon className='w-10 h-10 text-primary mx-auto' />
              </div>
              <h3 className='text-xl font-semibold mb-2 text-foreground dark:text-white'>{title}</h3>
              <p className='text-muted-foreground dark:text-foreground/80'>{description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
