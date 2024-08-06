import QuestionsClients from "../../data/CustomerQuestions";
import {
  AccordionQuestions,
  AccordionItem,
} from "../accordions/Frequent-questions";

export default function AccordionClientFaq() {
  return (
    <AccordionQuestions value="0">
      {QuestionsClients.map((question) => (
        <AccordionItem value={question.value} trigger={question.question}>
          {question.answer}
        </AccordionItem>
      ))}
    </AccordionQuestions>
  );
}
