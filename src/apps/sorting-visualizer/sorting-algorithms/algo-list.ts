import { bubbleSort } from './bubble';
import { insertionSort } from './insertion';
import { mergeSort } from './merge';
import { quickSort } from './quick';
import { selectionSort } from './selection';

export const algoList = [
  {
    name: 'bubble',
    fn: bubbleSort,
    metadata: {
      time: { best: 'Ω(n)', average: 'θ(n²)', worst: 'O(n²)' },
      space: 'O(1)',
      description: 'Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.',
      code: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`
    }
  },
  {
    name: 'selection',
    fn: selectionSort,
    metadata: {
      time: { best: 'Ω(n²)', average: 'θ(n²)', worst: 'O(n²)' },
      space: 'O(1)',
      description: 'Selection sort repeatedly selects the smallest element from the unsorted portion and moves it to the sorted portion.',
      code: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        swap(arr[min_idx], arr[i]);
    }
}`
    }
  },
  {
    name: 'insertion',
    fn: insertionSort,
    metadata: {
      time: { best: 'Ω(n)', average: 'θ(n²)', worst: 'O(n²)' },
      space: 'O(1)',
      description: 'Insertion sort builds the final sorted array one item at a time, similar to how you sort playing cards in your hands.',
      code: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`
    }
  },
  {
    name: 'merge',
    fn: mergeSort,
    metadata: {
      time: { best: 'Ω(n log(n))', average: 'θ(n log(n))', worst: 'O(n log(n))' },
      space: 'O(n)',
      description: 'Merge Sort is a Divide and Conquer algorithm that splits the array into halves, sorts them, and then merges them back together.',
      code: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];

    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`
    }
  },
  {
    name: 'quick',
    fn: quickSort,
    metadata: {
      time: { best: 'Ω(n log(n))', average: 'θ(n log(n))', worst: 'O(n²)' },
      space: 'O(log(n))',
      description: 'QuickSort picks an element as a pivot and partitions the array around the pivot.',
      code: `int partition(int arr[], int low, int high) {
    int pivot = arr[high]; 
    int i = (low - 1); 
  
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++; 
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
    }
  },
];