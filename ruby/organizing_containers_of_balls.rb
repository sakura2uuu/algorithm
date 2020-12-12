# Problem: https://www.hackerrank.com/challenges/organizing-containers-of-balls/problem

# First solution does not produce correct result
def organizingContainers(container)
  num_of_balls = {}
  num_of_balls.default = 0

  container.each_with_index do |c, c_index|
    c.each_with_index do |count, i_index|
      num_of_balls[i_index] += count
    end
  end

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

# Second solution cannot produce correct result if need to swap balls other than index and index2
def organizingContainers2(containers)
  containers.each_with_index do |current_container, index|
    # Ball in current index of current_container will not move
    # For example, container 0 with ball 0

    # Loop through other containers
    containers[index+1..-1].each_with_index do |other_container, index2|
      ball_n = index + 1 + index2
      next if other_container[ball_n] == 0 || current_container[ball_n] == 0

      # Swap balls between two containers
      diff = [current_container[ball_n], other_container[index]].min

      current_container[index] += diff
      current_container[ball_n] -= diff
      other_container[index] -= diff
      other_container[ball_n] += diff
    end

    # If after going through all other containers, still have other balls in current container
    if current_container[index+1..-1].sum > 0
      return 'Impossible'
    end
  end

  'Possible'
end

# Solution based on comment: https://www.hackerrank.com/challenges/organizing-containers-of-balls/forum/comments/374692
# 1) Make a table of box totals (capacity of each box)
# 2) Make a table of ball totals (total quantity of each ball type)
# 3) Sort both tables
# 4) If they are identical print Possible, otherwise print Impossible
def organizingContainers3(containers)
  length = containers.length
  container_capacity = Array.new(length, 0)
  ball_quantity = Array.new(length, 0)

  containers.each_with_index do |container, container_index|
    container.each_with_index do |num_of_balls, ball_index|
        container_capacity[container_index] += num_of_balls
        ball_quantity[ball_index] += num_of_balls
    end
  end

  ball_quantity.sort == container_capacity.sort ? 'Possible' : 'Impossible'
end
