# Problem: https://www.hackerrank.com/challenges/taum-and-bday/problem

def taumBday(num_of_black_gifts, number_of_white_gifts, cost_of_black_gift, cost_of_white_gift, cost_of_converting_gift)
  difference = cost_of_black_gift - cost_of_white_gift

  if difference.zero? || difference.abs < cost_of_converting_gift
    # Do nothing
  elsif difference.positive?
    cost_of_black_gift = cost_of_white_gift + cost_of_converting_gift
  else
    cost_of_white_gift = cost_of_black_gift + cost_of_converting_gift
  end

  (num_of_black_gifts * cost_of_black_gift) + (number_of_white_gifts * cost_of_white_gift)
end
