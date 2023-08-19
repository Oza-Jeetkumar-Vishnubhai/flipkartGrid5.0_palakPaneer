#!/bin/bash

# Get the current CPU usage as a percentage
cpu_usage=$(top -n 1 | grep "Cpu(s)" | awk '{print $2 + $4}')

# Determine the state based on CPU usage
if (( $(echo "$cpu_usage > 70" | bc -l) )); then
    state="overloaded"
elif (( $(echo "$cpu_usage >= 30 && $cpu_usage <= 70" | bc -l) )); then
    state="moderately loaded"
else
    state="lightly-loaded"
fi

# Print the CPU usage and state
echo "Current CPU Usage: $cpu_usage%"
echo "Machine State: $state"

