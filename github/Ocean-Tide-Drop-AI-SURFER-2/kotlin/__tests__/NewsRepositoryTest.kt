package com.example.news

import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.first
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalCoroutinesApi::class)
class NewsRepositoryTest {
    @Test
    fun `repository refresh updates state`() = runTest {
        val scope = CoroutineScope(SupervisorJob() + Dispatchers.Default)
        val remote = object : NewsRemoteDataSource(scope) {
            override suspend fun fetchLatest(): List<ArticleHeadline> {
                return listOf(ArticleHeadline(id = "t1", title = "T1"))
            }
        }
        val tickHandler = TickHandler(scope, tickIntervalMs = 10)
        val repo = NewsRepository(scope, remote, tickHandler)

        // trigger a refresh and read the first emitted list
        val list = repo.favoriteLatestNews.first { it.isNotEmpty() }
        assertEquals(1, list.size)
    }
}
