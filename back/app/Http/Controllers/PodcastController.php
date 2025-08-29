<?php

namespace App\Http\Controllers;

use App\Models\Podcast;
use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\PodcastResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;


class PodcastController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10); 
        $idCategory = $request->input('category_id'); 
        $favorites = $request->input('favorites'); 
        Log::info($favorites);
     
      
        try {
            
            if ($favorites) {
              
                $user = Auth::user();
                
                $podkastiQuery = $user->myFavoritePodcasts();
              
            } else {
                $podkastiQuery = Podcast::query();
            }
    
       
            if ($idCategory) {
                $category = Category::find($idCategory);
    
                if (!$category) {
                    return response()->json([
                        'message' => 'Category not found.',
                    ], 404);
                }
    
              
                $podkastiQuery->whereHas('category', function ($query) use ($idCategory) {
                    $query->where('id', $idCategory);
                });
            }
    
            $podkasti = $podkastiQuery->orderBy('title', 'asc')->paginate($perPage);
            return PodcastResource::collection($podkasti);
    
        } catch (\Exception $e) {
           
            return response()->json([
                'message' => 'An error occurred while fetching the podcast.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    





}

    






