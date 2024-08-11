from abc import ABC, abstractmethod

class ExaminerClass(ABC):
    @abstractmethod
    def examine(self, writing: str):
        pass

class FreeExaminer(ExaminerClass):
    def examine(self, writing: str):
        return '' #call chat service

class PremiumExaminer(ExaminerClass):
    def examine(self, writing: str):
        return ''