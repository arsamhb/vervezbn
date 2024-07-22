import xml.etree.ElementTree as ET
response = '''
<comment>The essay provides a clear and well-organized examination of the advantages and disadvantages of working for both large and small companies, effectively addressing the prompt. The writer begins with a personal preference for large companies, establishing a clear position, and then explores both sides of the argument in detail.

The introduction sets up the discussion nicely, and the body paragraphs are well-developed, offering specific examples and reasons to support the points made. The benefits of working for large companies, such as access to more resources, higher salaries, and professional development opportunities, are convincingly presented. The writer also discusses the stability and potential for career advancement in large companies, providing a balanced view.

The analysis of small companies is equally comprehensive. The writer highlights the sense of individuality and the opportunity to develop a broad skill set, which are valid advantages. The potential downsides, such as strained relationships and instability, are also addressed, providing a realistic perspective.

The conclusion effectively summarizes the key points and reiterates the writer's preference for large companies while acknowledging that the choice depends on personal preference. This balanced conclusion demonstrates a nuanced understanding of the topic.

There are a few minor grammatical errors, such as "if" instead of "it" and "our" instead of "out," which should be corrected. Additionally, varying sentence structures could enhance the overall readability and engagement of the essay. Overall, the response is well-argued and coherent, making a strong case for the writer's viewpoint.</comment>
<score>7.5</score>
'''

tree = ET.fromstring(f'<?xml version="1.0" encoding="UTF-8" ?>\n<root>\n{response}</root>'.strip())
print(tree.find('score').text, tree.find('comment').text)