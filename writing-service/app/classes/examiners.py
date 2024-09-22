from abc import ABC, abstractmethod
from app.services.chat import Chat
import xml.etree.ElementTree as ET
from app.schemas.examiner.free_examiner_response import FreeExaminerResponse
from app.schemas.examiner.prem_examiner_response import PremExaminerResponse, PremExaminerResponseItem


class ExaminerClass(ABC):
    @abstractmethod
    def parse(self, comment: str):
        pass

    def examine(self, writing: str, prompt: str):
        chat = Chat()
        return chat.ask(self.q.format(writing=writing, prompt=prompt))


class FreeExaminer(ExaminerClass):
    def __init__(self) -> None:
        self.q = '''just generate the examiner comments in the <comment> XML tag and the band score in the <score> tag for the writing delimited by single quotes with respect to the writing prompt delimited by double quotes with about 200 words
'{writing}'
''{prompt}'' '''

    def parse(self, comment: str) -> FreeExaminerResponse:
        tree = ET.fromstring(
            f'<?xml version="1.0" encoding="UTF-8" ?>\n<root>\n{comment}</root>'.strip())
        comment = tree.find('comment').text.strip()
        score = int(''.join(filter(str.isdigit, tree.find('score').text)))
        return FreeExaminerResponse(score=score, comment=comment)


class PremiumExaminer(ExaminerClass):
    def __init__(self) -> None:
        self.q = '''examine the writing delimited by single quotes for the writing prompt delimited by double quotes, then for 5 comments you have, just generate a single replacement advice for the section you have comment in the <comment> XML tag inside the <repl> XML tag also inside the <repl> XML tag put nested start and end character index of the writing part you are commenting in the <start> and <end> XML tag. please don't generate any further text or boilerplates in the response
'{writing}'
''{prompt}'' '''

    def parse(self, comment: str) -> PremExaminerResponse:
        tree = ET.fromstring(
            f'<?xml version="1.0" encoding="UTF-8" ?>\n<root>\n{comment}</root>'.strip())
        items = []
        for repl in tree.findall('repl'):
            items.append(PremExaminerResponseItem(start=int(repl.find('start').text), end=int(
                repl.find('end').text), comment=repl.find('comment').text))
        return PremExaminerResponse(items=items)