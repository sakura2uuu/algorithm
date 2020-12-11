# Problem: https://www.hackerrank.com/challenges/acm-icpc-team/problem

# Original solution taking too long to run
def acmTeam(topic)
  num_of_attendees = topic.count

  permutations = (0..(num_of_attendees - 1)).to_a.permutation(2).to_a
  unique_permutations = permutations.map do |array|
    array.sort
  end.uniq

  result = unique_permutations.map do |person1, person2|
    (topic[person1].to_i(2) | topic[person2].to_i(2)).to_s(2).scan('1').count
  end

  [max = result.max, result.count(max)]
end

# Solution Referred: https://www.hackerrank.com/rest/contests/master/challenges/acm-icpc-team/hackers/kgyrtkirk/download_solution
def acmTeam2(topic)
  num_of_attendees = topic.count

  # 1. Convert to binary first
  topic_converted = topic.map{ |a| a.to_i(2) }

  # 2. Use json to store result
  result = {}
  result.default = 0

  # 3. Use for-loop to get the permutations
  # Example for 4 attendees
  # person1: (0)      , (1),    (2)
  # person2: (1, 2, 3), (2, 3), (3)
  (0..(num_of_attendees - 2)).each do |person1|
    ((person1 + 1)..(num_of_attendees - 1)).each do |person2|
      known_topics = (topic_converted[person1] | topic_converted[person2]).to_s(2).count('1')
      result[known_topics]+=1
    end
  end

  [max = result.keys.max, result[max]]
end
