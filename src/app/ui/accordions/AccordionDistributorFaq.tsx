import QuestionsDistributors from "../../data/DistributorQuestions";
import { AccordionQuestions, AccordionItem } from "./Frequent-questions";

export default function AccordionDistributorFaq() {
  return (
    <AccordionQuestions value="0">
      {QuestionsDistributors.map((question) => (
        <AccordionItem
          key={question.value}
          value={question.value}
          trigger={question.question}
        >
          {question.answer}
        </AccordionItem>
      ))}
    </AccordionQuestions>
  );
}
