import xml.etree.ElementTree as ET
response = '''
<repl>
  <start>55</start>
  <end>71</end>
  <comment>Consider removing the personal preference to maintain a more objective tone in evaluating the two types of companies.</comment>
</repl>
<repl>
  <start>127</start>
  <end>169</end>
  <comment>Add specific examples or evidence to support claims about resources and professional development opportunities at large companies.</comment>
</repl>
<repl>
  <start>233</start>
  <end>290</end>
  <comment>Revise "if is hard to stand our" to "it is hard to stand out" for clarity and correctness.</comment>
</repl>
<repl>
  <start>319</start>
  <end>379</end>
  <comment>Provide more details or examples of how small companies can be unstable and how this impacts employees.</comment>
</repl>
<repl>
  <start>397</start>
  <end>422</end>
  <comment>Reframe the conclusion to more explicitly tie back to the advantages and disadvantages discussed earlier.</comment>
</repl>
'''

tree = ET.fromstring(f'<?xml version="1.0" encoding="UTF-8" ?>\n<root>\n{response}</root>'.strip())
for repl in tree.findall('repl'):
    text = repl.text.strip()
    print(text)
    for child in repl:
        print(f"Child Tag: {child.tag}, Child Text: {child.text.strip() if child.text else 'No text found'}")