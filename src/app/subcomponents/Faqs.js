import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import appData from "@/app/data.json";

export default function Faqs() {
  return (
    <section id='faqs' className='app-features py-8 px-4 sm:px-6 lg:px-8 bg-background'>
      <div className='max-w-3xl mx-auto text-center mb-16'>
        <h2 className='text-4xl sm:text-5xl font-bold mb-4 text-foreground text-balance'>FAQs</h2>
        <p className='text-md font-medium dark:text-foreground/80'>Frequently asked questions about our YouTube Downloader.</p>
      </div>

      <div className='max-w-5xl mx-auto'>
        <Accordion type='single' collapsible className='w-full' defaultValue='item-1'>
          {appData.faqs.map(({ question, answer }, index) => {
            return (
              <AccordionItem key={index} value={`item-${index + 4}`}>
                <AccordionTrigger className='font-semibold hover:text-foreground hover:no-underline dark:text-foreground'>
                  {question}
                </AccordionTrigger>
                <AccordionContent className='text-foreground/90 dark:text-foreground/80'>
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
