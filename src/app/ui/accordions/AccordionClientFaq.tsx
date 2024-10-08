import QuestionsClients from "../../data/CustomerQuestions";
import { AccordionQuestions, AccordionItem } from "./Frequent-questions";

export default function AccordionClientFaq() {
  return (
    <AccordionQuestions value="0">
      {QuestionsClients.map((question) => (
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
