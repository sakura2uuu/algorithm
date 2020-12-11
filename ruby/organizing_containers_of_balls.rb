# Problem: https://www.hackerrank.com/challenges/organizing-containers-of-balls/problem

def organizingContainers(container)
  num_of_balls = {}
  num_of_balls.default = 0

  container.each_with_index do |c, c_index|
    c.each_with_index do |count, i_index|
      num_of_balls[i_index] += count
    end
  end

  swapable_space = {}
  swapable_space.default = 0

  if num_of_balls.values.inject(:+).even?
    balls_with_odd_count = num_of_balls.values.select{ |v| v.odd? }.count

    if balls_with_odd_count.even?
      'Possible'
    else
      'Impossible'
    end
  else
    'Impossible'
  end
end
