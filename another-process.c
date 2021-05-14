#include <stdio.h>

int main(){
  long long sum = 0;
  for (long long i = 0; i < (long long)(999999999LL); i++){
    sum += i;
  }
  printf("%lld", sum);
  return 0;
}