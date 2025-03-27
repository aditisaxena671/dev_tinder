import java.util.ArrayList;
import java.util.List;

class Solution {
    public static void main(String args[]){
        // Example input
        int[] nums = {1, 2, 3};
        
        // Create an instance of the Solution class
        Solution solution = new Solution();
        
        // Generate all subsequences
        List<List<Integer>> result = solution.generateSubsequences(nums);
        
        // Print the subsequences
        System.out.println(result);
    }

    public List<List<Integer>> generateSubsequences(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        generateSubsequencesHelper(nums, 0, new ArrayList<>(), result);
        return result;
    }

    private void generateSubsequencesHelper(int[] nums, int index, List<Integer> current, List<List<Integer>> result) {
        // Base case: if we've processed all elements
        if (index == nums.length) {
            result.add(new ArrayList<>(current)); // Add the current subsequence to the result
            return;
        }

        // Case 1: Do not pick the current element (skip it)
        generateSubsequencesHelper(nums, index + 1, current, result);

        // Case 2: Pick the current element
        current.add(nums[index]); // Add the element to the current subsequence
        generateSubsequencesHelper(nums, index + 1, current, result);
        current.remove(current.size() - 1); // Backtrack, remove the last element
    }
}
